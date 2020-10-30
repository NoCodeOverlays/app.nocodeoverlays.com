import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components';
import { useOverlay } from '../context/overlay';

const OverlayPage = ({ fontFamilies }) => {
  const { data, loading } = useOverlay();
  const router = useRouter();

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!loading && !data) {
    router.push({
      pathname: 'login',
      query: {
        returnTo: router.pathname,
      },
    });
    return null;
  }

  const { width, height, widgets } = data;

  return (
    <Layout fullscreen>
      <div
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
          overflow: 'hidden',
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
                  width: 'fit-content',
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
