import { useState } from 'react';
import { Button, Layout, Modal } from '../components';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout title="No-Code Overlays App">
      <h1>Temporary area for testing things</h1>
      <br />

      <Button
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        Open Modal
      </Button>
      {showModal && (
        <Modal
          title="Modal title"
          onClose={() => {
            setShowModal(false);
          }}
          buttons={[
            <Button>Hi</Button>,
            <Button>Hi</Button>,
            <Button>Hi</Button>,
          ]}
        >
          <h2>Hi, I'm a modal!</h2>
        </Modal>
      )}
    </Layout>
  );
};

export default HomePage;
