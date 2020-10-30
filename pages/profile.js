import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';
import { Button, Input } from '@amb-codes-crafts/a11y-components';
import { Layout } from '../components';

const ProfilePage = () => {
  const router = useRouter();
  const { user, userLoading } = useAuth();

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace('/login');
    }
  }, [userLoading, user]);

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>Redirecting</h1>;
  }

  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');

  return (
    <Layout title="No-Code Overlays | Profile">
      <h2>Profile Page</h2>
      <p>Member since: {user.metadata.creationTime}</p>
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ flexGrow: 1, marginRight: 24 }}>
          <Input
            label="Display name"
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </div>
        <Button
          disabled={!(!!displayName && displayName !== user.displayName)}
          onClick={() => {
            user.updateProfile({ displayName }).then(() => {
              alert('New display name saved.');
            });
          }}
        >
          Save
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ flexGrow: 1, marginRight: 24 }}>
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {!!email && email !== user.email ? (
          <Button
            onClick={() => {
              user
                .verifyBeforeUpdateEmail(email)
                .then(() => {
                  alert('Verification email sent. Please check your inbox.');
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            Update Email
          </Button>
        ) : (
          <Button
            disabled={user.emailVerified}
            onClick={() => {
              user.sendEmailVerification().then(() => {
                alert('Email verification sent. Please check your inbox.');
              });
            }}
          >
            {user.emailVerified ? 'Verified' : 'Verify'}
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
