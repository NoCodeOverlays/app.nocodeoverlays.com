import { Icon, Layout } from "../components";

const HomePage = () => (
  <Layout title="No-Code Overlays App">
    <h1>Icons for PR Testing</h1>
    <p>medium (default)</p>
    <Icon name="pencil-alt" />

    <p>small</p>
    <Icon name="pencil-alt" medium />

    <p>large</p>
    <Icon name="pencil-alt" large />
  </Layout>
);

export default HomePage;
