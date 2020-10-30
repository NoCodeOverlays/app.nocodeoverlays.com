import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@amb-codes-crafts/a11y-components';
import classNames from 'classnames/bind';
import { useAuth } from '../../context/auth';
import { firebaseAPI } from '../../lib/firebase';
import styles from './Layout.module.scss';

const Layout = ({ title, children, fullscreen }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const cx = classNames.bind(styles);
  const className = cx('Layout', {
    'Layout--fullscreen': !!fullscreen,
  });

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [loading, user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    router.replace({
      pathname: '/login',
      query:
        router.pathname === '/'
          ? undefined
          : {
              returnTo: router.pathname,
            },
    });
    return <h1>Redirecting...</h1>;
  }

  return (
    <div className={className}>
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
              firebaseAPI('signOut');
              router.replace('/login');
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
