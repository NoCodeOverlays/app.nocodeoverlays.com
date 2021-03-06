import { useEffect, useLayoutEffect, useState } from 'react';
import { useOverlay } from '@contexts';
import { firebaseAPI } from '@lib/firebase';
import {
  AddWidgetModal,
  Layout,
  Overlay,
  EditOverlaySidebar,
} from '@components';
import styles from '@styles/EditOverlayPage.module.scss';

const EditOverlayPage = ({ fontFamilies }) => {
  const { data, dataLoading, setDataLoading, setData } = useOverlay();
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
      <div className={styles.EditOverlayPage}>
        <p>Your Preview</p>
        <div className={styles.OverlayContainer}>
          <Overlay width={width} height={height} widgets={widgets} />
        </div>
        <EditOverlaySidebar
          height={height}
          isSaving={isSaving}
          setHeight={setHeight}
          setIsSaving={setIsSaving}
          setShowAddWidgetModal={setShowAddWidgetModal}
          setWidgets={setWidgets}
          setWidth={setWidth}
          widgets={widgets}
          width={width}
        />
        {showAddWidgetModal && (
          <AddWidgetModal
            fontFamilies={fontFamilies}
            onClose={() => {
              setShowAddWidgetModal(false);
            }}
            onAdd={(attributes) => {
              setDataLoading(true);
              firebaseAPI('createOverlayWidget', {
                ...attributes,
                position: widgets.length,
              }).then((newWidget) => {
                setData({ ...data, widgets: [...data.widgets, newWidget] });
                setShowAddWidgetModal(false);
                setDataLoading(false);
              });
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
