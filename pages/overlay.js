import { useLayoutEffect } from 'react';
import { Layout, Overlay } from '../components';
import { useAuth } from '../contexts/auth';
import { useOverlay } from '../contexts/overlay';

const OverlayPage = ({ fontFamilies }) => {
  const { user, userLoading } = useAuth();
  const { data, dataLoading } = useOverlay();

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

  const getContents = () => {
    if (!userLoading && !user) {
      return <h1>Redirecting</h1>;
    }

    if (userLoading || dataLoading) {
      return <h1>Loading...</h1>;
    }

    const { width, height, widgets } = data;
    return <Overlay width={width} height={height} widgets={widgets} />;
  };

  return (
    <Layout title="No-Code Overlays | Overlay" fullscreen>
      {getContents()}
    </Layout>
  );
};

OverlayPage.getInitialProps = async () => {
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

export default OverlayPage;
