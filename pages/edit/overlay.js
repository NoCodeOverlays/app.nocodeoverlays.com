import { useLayoutEffect, useState } from 'react';
import { Button, Input } from '@amb-codes-crafts/a11y-components';
import { firebaseAPI } from '../../lib/firebase';
import { useOverlay } from '../../context/overlay';
import { AddWidgetModal, Icon, Layout, Sidebar } from '../../components';
import styles from '../../stylesheets/Pages.module.scss';

const EditOverlayPage = () => {
  const { data, loading } = useOverlay();
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [widgets, setWidgets] = useState({});

  useLayoutEffect(() => {
    if (!data) {
      return;
    }

    setWidth(data.width);
    setHeight(data.height);
    setWidgets(data.widgets);

    const WebFont = require('webfontloader');
    const familiesToLoad = Object.keys(widgets)
      .filter((widgetKey) => widgets[widgetKey].type === 'text')
      .map((widgetKey) => widgets[widgetKey].fontFamily);
    if (familiesToLoad.length) {
      WebFont.load({
        google: {
          families: familiesToLoad,
        },
      });
    }
  }, [data]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
          {Object.keys(widgets).map((widgetKey, index) => {
            const widget = widgets[widgetKey];
            if (widget.type === 'color') {
              return (
                <div
                  key={`widget-${index}`}
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
            } else if (widget.type === 'image') {
              return (
                <img
                  key={`widget-${index}`}
                  src={widget.url}
                  style={{
                    width: `${widget.width}px`,
                    height: `${widget.height}px`,
                    position: 'absolute',
                    top: `${widget.yPosition}px`,
                    left: `${widget.xPosition}px`,
                  }}
                />
              );
            } else if (widget.type === 'text') {
              return (
                <span
                  key={`widget-${index}`}
                  style={{
                    width: `${widget.width}px`,
                    height: `${widget.height}px`,
                    position: 'absolute',
                    top: `${widget.yPosition}px`,
                    left: `${widget.xPosition}px`,
                    fontFamily: widget.fontFamily,
                    fontSize: `${widget.fontSize}px`,
                  }}
                >
                  {widget.text}
                </span>
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
                        key={`widget-${widgetKey}`}
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
                          <span
                            key={`widgetAttribute-${attribute}-${widgetKey}`}
                            style={{ display: 'block' }}
                          >
                            <strong>{attribute}:</strong>{' '}
                            {widget[attribute].family
                              ? widget[attribute].family
                              : widget[attribute]}
                          </span>
                        ))}
                        <Button
                          onClick={() => {
                            delete widgets[widgetKey];
                            setIsSaving(true);
                            firebaseAPI('updateOverlayData', {
                              width,
                              height,
                              widgets,
                            }).then(() => {
                              setWidgets({ ...widgets });
                              setIsSaving(false);
                            });
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
              firebaseAPI('updateOverlayData', { width, height }).then(() => {
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
              firebaseAPI('createOverlayWidget', attributes).then(
                (newWidget) => {
                  const newWidgetKey = Object.keys(newWidget)[0];
                  setWidgets({
                    ...widgets,
                    [newWidgetKey]: newWidget[newWidgetKey],
                  });
                  setShowAddWidgetModal(false);
                },
              );
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default EditOverlayPage;
