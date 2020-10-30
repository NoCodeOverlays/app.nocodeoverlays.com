import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { firebaseAPI } from '../lib/firebase';
import { Button, Input } from '@amb-codes-crafts/a11y-components';

import styles from '../stylesheets/Pages.module.scss';
import { useAuth } from '../context/auth';

const LoginPage = () => {
  const router = useRouter();
  const { user, userLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    router.replace(router.query.returnTo || '/');
  }

  return (
    <div className={styles.Login}>
      <Head>
        <title>No Code Overlays | Log In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h1>Welcome to No-Code Overlays!</h1>
        <h2>Please log in to get going.</h2>
        <Input
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            firebaseAPI('signIn', email, password)
              .then((res) => {
                // nothing to do here
              })
              .catch((err) => {
                alert(err.message);
              });
          }}
        >
          Let's Go!
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
