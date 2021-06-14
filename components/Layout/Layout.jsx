import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'a11y-components';
import classNames from 'classnames/bind';
import { useAuth } from '@contexts';
import { firebaseAPI } from '@lib/firebase';
import styles from './Layout.module.scss';

const Layout = ({ title, children, fullscreen }) => {
  const router = useRouter();
  const { user, userLoading } = useAuth();

  const cx = classNames.bind(styles);
  const className = cx('Layout', {
    'Layout--fullscreen': !!fullscreen,
  });

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace({
        pathname: '/login',
        query: router.pathname !== '/' && {
          returnTo: router.pathname,
        },
      });
    }
  }, [userLoading, user]);

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>Redirecting...</h1>;
  }

  return (
    <div className={className}>
      <Head>
        <title>{'No Code Overlays' || title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Link href="/">
          <h1>
            <a>No-Code Overlays</a>
          </h1>
        </Link>
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
