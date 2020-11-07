import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Input } from '@amb-codes-crafts/a11y-components';
import { firebaseAPI } from '../../lib/firebase';
import { useOverlay } from '../../context/overlay';
import {
  AddWidgetModal,
  Icon,
  Layout,
  Overlay,
  Sidebar,
} from '../../components';
import styles from '../../stylesheets/Pages.module.scss';

const EditOverlayPage = ({ fontFamilies }) => {
  const { data, dataLoading } = useOverlay();
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [width, setWidth] = useState(data.width);
  const [height, setHeight] = useState(data.height);
  const [widgets, setWidgets] = useState(data.widgets);

  useEffect(() => {
    if (dataLoading) {
      return;
    }

    setWidth(data.width);
    setHeight(data.height);
    setWidgets(data.widgets);
  }, [dataLoading]);

  useLayoutEffect(() => {
    const WebFont = require('webfontloader');
    const familiesToLoad = fontFamilies.map((fontFamily) => fontFamily.label);
    if (familiesToLoad.length) {
      WebFont.load({
        google: {
          families: familiesToLoad,
        },
      });
    }
  }, []);

  if (dataLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="No-Code Overlays | Edit Overlay">
      <div className={styles.EditOverlay}>
        <p>Your Preview</p>
        <Overlay width={width} height={height} widgets={widgets} />
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
                onChange={(e) => {
                  setWidth(e.target.value);
                }}
              />
              <Input
                id="height"
                type="number"
                label="Height (px)"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
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
            fontFamilies={fontFamilies}
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

EditOverlayPage.getInitialProps = async () => {
  const fontFamilies = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.NEXT_PUBLIC_GOOGLE_WEB_FONTS_DEVELOPER_API_KEY}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.items
        .slice(0, 100)
        .sort((a, b) => (a.family <= b.family ? -1 : 1))
        .map((font, index) => ({ id: index, label: font.family }));
    });

  return { fontFamilies };
};

export default EditOverlayPage;
