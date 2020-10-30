import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Overlay } from '../components';
import { useAuth } from '../context/auth';
import { useOverlay } from '../context/overlay';

const OverlayPage = ({ fontFamilies }) => {
  const { user, userLoading } = useAuth();
  const { data, dataLoading } = useOverlay();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!fontsLoaded) {
      const WebFont = require('webfontloader');
      const familiesToLoad = fontFamilies.map((fontFamily) => fontFamily.label);
      if (familiesToLoad.length) {
        WebFont.load({
          google: {
            families: familiesToLoad,
          },
        });
      }
      setFontsLoaded(true);
    }

    if (!userLoading && !user) {
      router.push({
        pathname: 'login',
        query: {
          returnTo: router.pathname,
        },
      });
    }
  }, [userLoading, user]);

  if (!userLoading && !user) {
    return <h1>Redirecting</h1>;
  }

  if (userLoading || dataLoading) {
    return <h1>Loading...</h1>;
  }

  console.log('overlay page');
  console.log('  user loading?', userLoading);
  console.log('  user?', user);
  console.log('  dataLoading?', dataLoading);
  console.log('  data?', data);

  const { width, height, widgets } = data;

  return <Overlay width={width} height={height} widgets={widgets} />;
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
