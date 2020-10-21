import Link from 'next/link';
import { Layout } from '../components';

const HomePage = () => (
  <Layout title="No-Code Overlays App">
    <h1>Temporary area for testing things</h1>
    <br />

    <Link href="/edit/overlay">
      <a>Edit Overlay</a>
    </Link>
  </Layout>
);

export default HomePage;
