import { AuthProvider } from '../contexts/auth';
import { OverlayProvider } from '../contexts/overlay';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'a11y-components/dist/Listbox/Listbox.css';
import '../styles/global.scss';

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
