import { useState } from 'react';
import { Button, Input } from 'a11y-components';
import { firebaseAPI } from '../../lib/firebase';
import { Icon } from '../../components';
import styles from './EditOverlaySidebar.module.scss';

console.log(styles);

const EditOverlaySidebar = ({
  height,
  isSaving,
  setHeight,
  setIsSaving,
  setWidgets,
  setWidth,
  widgets,
  width,
}) => {
  const [widthTypingTimeout, setWidthTypingTimeout] = useState();
  const [heightTypingTimeout, setHeightTypingTimeout] = useState();

  const updateWidth = (width) => {
    setWidth(width);

    if (widthTypingTimeout) {
      clearTimeout(widthTypingTimeout);
    }

    setWidthTypingTimeout(
      setTimeout(() => {
        setIsSaving(true);
        firebaseAPI('updateOverlayWidth', width).then(() => {
          setIsSaving(false);
        });
      }, 1000),
    );
  };

  const updateHeight = (height) => {
    setHeight(height);

    if (heightTypingTimeout) {
      clearTimeout(heightTypingTimeout);
    }

    setHeightTypingTimeout(
      setTimeout(() => {
        setIsSaving(true);
        firebaseAPI('updateOverlayHeight', height).then(() => {
          setIsSaving(false);
        });
      }, 1000),
    );
  };

  return (
    <div className={styles.EditOverlaySidebar}>
      <section>
        <div className={styles.SectionTitle}>
          <h2>Dimensions</h2>
          {isSaving && <Icon name="spinner" spin small />}
        </div>
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
            onChange={(e) => {
              updateWidth(e.target.value);
            }}
            style={{ marginRight: 12 }}
          />
          <Input
            id="height"
            type="number"
            label="Height (px)"
            value={height}
            onChange={(e) => {
              updateHeight(e.target.value);
            }}
          />
        </div>
      </section>
      <section>
        <div className={styles.SectionTitle}>
          <h2>Widgets</h2>
          <Button
            onClick={() => {
              setShowAddWidgetModal(true);
            }}
          >
            <Icon name="plus" small />
          </Button>
        </div>
        <div>
          {Object.keys(widgets).length
            ? Object.keys(widgets).map((widgetKey) => {
                const widget = widgets[widgetKey];
                return (
                  <details
                    key={`widget-${widgetKey}`}
                    style={{
                      border: '1px solid gray',
                      borderRadius: '4px',
                      marginBottom: '12px',
                      hover: 'cursor',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <summary
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        padding: '12px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{widget.type}</span>
                      <Button
                        onClick={() => {
                          delete widgets[widgetKey];
                          setIsSaving(true);
                          firebaseAPI('updateOverlayWidgets', widgets).then(
                            () => {
                              setWidgets({ ...widgets });
                              setIsSaving(false);
                            },
                          );
                        }}
                        style={{
                          borderRadius: '50%',
                          backgroundColor: 'transparent',
                          color: 'black',
                          border: 'none',
                          boxShadow: 'none',
                          padding: 0,
                        }}
                      >
                        <Icon name="trash-alt" small />
                      </Button>
                    </summary>
                    <div
                      style={{
                        padding: '12px',
                        borderTop: '1px solid gray',
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
                    </div>
                  </details>
                );
              })
            : 'No widgets yet.'}
        </div>
      </section>
    </div>
  );
};

export default EditOverlaySidebar;
