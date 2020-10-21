import { useState } from 'react';
import {
  createOverlayWidget,
  getOverlayData,
  updateOverlayData,
} from '../../lib/api';
import { Button, Icon, Input, Layout, Modal, Sidebar } from '../../components';
import styles from '../../stylesheets/Pages.module.scss';

const typesToAttributes = {
  color: [
    { id: 'width', label: 'Width', type: 'number' },
    { id: 'height', label: 'Height', type: 'number' },
    { id: 'xPosition', label: 'X Position', type: 'number' },
    { id: 'yPosition', label: 'Y Position', type: 'number' },
    { id: 'color', label: 'Color (Hex)', type: 'text' },
  ],
};

const AddWidgetModal = ({ onClose, onAdd }) => {
  const [widgetType, setWidgetType] = useState('');
  const [attributes, setAttributes] = useState({});

  return (
    <Modal
      title="Add a widget"
      onClose={onClose}
      buttons={[
        <Button
          disabled={!widgetType}
          onClick={() => {
            onAdd(attributes);
          }}
        >
          Add
        </Button>,
      ]}
    >
      <label htmlFor="setWidgetType">Widget type</label>
      <select
        id="widgetType"
        value={widgetType}
        onChange={(e) => {
          setWidgetType(e.target.value);
        }}
      >
        <option value="">Choose a type</option>
        <option value="color">Color Block</option>
      </select>

      {widgetType && (
        <>
          {typesToAttributes[widgetType].map(({ id, label, type }) => (
            <Input
              id={id}
              key={`widgetInput-${id}`}
              label={label}
              type={type}
              value={attributes[id] || ''}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  [id]: value,
                  type: widgetType,
                });
              }}
            />
          ))}
        </>
      )}
    </Modal>
  );
};

const EditOverlayPage = ({ data }) => {
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [width, setWidth] = useState(data && data.width ? data.width : '');
  const [height, setHeight] = useState(data && data.height ? data.height : '');
  const [widgets, setWidgets] = useState(
    data && data.widgets ? data.widgets : {}
  );

  return (
    <Layout title="Edit Overlay">
      <div className={styles.EditOverlay}>
        <p>Your Preview</p>
        <div
          style={{
            position: 'relative',
            width: `${width}px`,
            height: `${height}px`,
            border: '1px solid black',
          }}
        >
          {Object.keys(widgets).map((widgetKey) => {
            const widget = widgets[widgetKey];
            if (widget.type === 'color') {
              return (
                <div
                  style={{
                    width: `${widget.width}px`,
                    height: `${widget.height}px`,
                    backgroundColor: widget.color,
                    position: 'absolute',
                    top: `${widget.yPosition}px`,
                    left: `${widget.xPosition}px`,
                  }}
                ></div>
              );
            }
          })}
        </div>
        <Sidebar>
          <div>
            <h2>Dimensions</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Input
                id="width"
                type="number"
                label="Width (px)"
                value={width}
                onChange={setWidth}
              />
              <Input
                id="height"
                type="number"
                label="Height (px)"
                value={height}
                onChange={setHeight}
              />
            </div>
          </div>
          <div>
            <div>
              <h2>Widgets</h2>
              <Button
                onClick={() => {
                  setShowAddWidgetModal(true);
                }}
              >
                <Icon name="plus" />
              </Button>
            </div>
            <div>
              {Object.keys(widgets).length
                ? Object.keys(widgets).map((widgetKey) => {
                    const widget = widgets[widgetKey];
                    return (
                      <div
                        style={{
                          border: '1px solid gray',
                          borderRadius: '4px',
                          padding: '12px',
                          marginBottom: '12px',
                          hover: 'cursor',
                          position: 'relative',
                        }}
                      >
                        {Object.keys(widget).map((attribute) => (
                          <span style={{ display: 'block' }}>
                            <strong>{attribute}:</strong> {widget[attribute]}
                          </span>
                        ))}
                        <Button
                          onClick={() => {
                            delete widgets[widgetKey];
                            setIsSaving(true);
                            updateOverlayData({ width, height, widgets }).then(
                              () => {
                                setWidgets({ ...widgets });
                                setIsSaving(false);
                              }
                            );
                          }}
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            color: 'black',
                            border: 'none',
                            boxShadow: 'none',
                          }}
                        >
                          <Icon name="trash-alt" small />
                        </Button>
                      </div>
                    );
                  })
                : 'No widgets yet.'}
            </div>
          </div>
          <Button
            disabled={isSaving}
            onClick={() => {
              setIsSaving(true);
              updateOverlayData({ width, height }).then(() => {
                setIsSaving(false);
              });
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </Sidebar>
        {showAddWidgetModal && (
          <AddWidgetModal
            onClose={() => {
              setShowAddWidgetModal(false);
            }}
            onAdd={(attributes) => {
              createOverlayWidget(attributes).then((newWidget) => {
                const newWidgetKey = Object.keys(newWidget)[0];
                setWidgets({
                  ...widgets,
                  [newWidgetKey]: newWidget[newWidgetKey],
                });
                setShowAddWidgetModal(false);
              });
            }}
          />
        )}
      </div>
    </Layout>
  );
};

EditOverlayPage.getInitialProps = async () => {
  const overlayData = await getOverlayData();

  return {
    data: overlayData,
  };
};

export default EditOverlayPage;
