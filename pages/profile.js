import { useState } from 'react';
import { Button, Input } from 'a11y-components';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';

const ProfilePage = () => {
  const { user, userLoading } = useAuth();
  const [userObject, setUserObject] = useState(user || {});
  const [displayName, setDisplayName] = useState(userObject.displayName || '');
  const [email, setEmail] = useState(userObject.email || '');
  const [newPassword, setNewPassword] = useState('');

  const getContent = () => {
    if (userLoading) {
      return <h1>Loading...</h1>;
    }

    if (!user) {
      return <h1>Redirecting</h1>;
    }

    return (
      <>
        <h2>Profile Page</h2>
        <p>Member since: {userObject.metadata.creationTime}</p>
        <br />

        <div style={{ maxWidth: 600 }}>
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
                style={{ width: '100%' }}
              />
            </div>
            <Button
              disabled={
                !(!!displayName && displayName !== userObject.displayName)
              }
              onClick={() => {
                user.updateProfile({ displayName }).then(() => {
                  alert('New display name saved.');
                  setUserObject({ ...userObject, displayName });
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
                style={{ width: '100%' }}
              />
            </div>
            {!!email && email !== userObject.email ? (
              <Button
                onClick={() => {
                  user
                    .verifyBeforeUpdateEmail(email)
                    .then(() => {
                      alert(
                        'Verification email sent. Please check your inbox.',
                      );
                      setUserObject({ ...userObject, email });
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flexGrow: 1, marginRight: 24 }}>
              <Input
                label="Password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                style={{ width: '100%' }}
              />
            </div>
            <Button
              disabled={!newPassword}
              onClick={() => {
                user
                  .updatePassword(newPassword)
                  .then(() => {
                    alert('New password saved.');
                    setNewPassword('');
                  })
                  .catch((err) => {
                    alert(err.message);
                  });
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </>
    );
  };

  return <Layout title="No-Code Overlays | Profile">{getContent()}</Layout>;
};

export default ProfilePage;
