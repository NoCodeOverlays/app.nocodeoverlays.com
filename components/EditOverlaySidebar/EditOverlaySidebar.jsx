import { useState } from 'react';
import { Button, Input } from 'a11y-components';
import { firebaseAPI } from '@lib/firebase';
import { Icon } from '@components';
import WidgetList from './components/WidgetList';
import styles from './EditOverlaySidebar.module.scss';

const EditOverlaySidebar = ({
  height,
  isSaving,
  setHeight,
  setIsSaving,
  setShowAddWidgetModal,
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
        <div className={styles.DimensionInputs}>
          <Input
            id="width"
            type="number"
            label="Width (px)"
            value={width}
            onChange={(e) => updateWidth(e.target.value)}
          />
          <Input
            id="height"
            type="number"
            label="Height (px)"
            value={height}
            onChange={(e) => updateHeight(e.target.value)}
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
          {widgets.length ? (
            <WidgetList setIsSaving={setIsSaving} />
          ) : (
            'No widgets yet.'
          )}
        </div>
      </section>
    </div>
  );
};

export default EditOverlaySidebar;
