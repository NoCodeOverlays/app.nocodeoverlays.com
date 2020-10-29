import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@amb-codes-crafts/a11y-components';
import { useAuth } from '../../auth';
import { firebaseAPI } from '../../lib/firebase';
import styles from './Layout.module.scss';

const Layout = ({ title, children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/login');
    }
  }, [loading, user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    router.replace('/login');
  }

  return (
    <div className={styles.Layout}>
      <Head>
        <title>{'No Code Overlays' || title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <h1>No-Code Overlays</h1>
        <div>
          <span>Hey, {user.email}!</span>
          <Button
            onClick={() => {
              firebaseAPI('signOut').then(() => {
                setUser();
              });
            }}
          >
            Sign Out
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
