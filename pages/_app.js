import { AuthProvider } from '../context/auth';
import { OverlayProvider } from '../context/overlay';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'a11y-components';
import '../stylesheets/global.scss';

library.add(fas);

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <OverlayProvider>
        <Component {...pageProps} />
      </OverlayProvider>
    </AuthProvider>
  );
}
