import { Layout, Sidebar } from "../../components";

import styles from "../../stylesheets/Pages.module.scss";

const EditOverlayPage = () => (
  <Layout title="Edit Overlay">
    <div className={styles.EditOverlay}>
      <div>This is where the overlay contents will go</div>
      <Sidebar />
    </div>
  </Layout>
);

export default EditOverlayPage;
