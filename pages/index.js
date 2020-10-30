import Link from 'next/link';
import { Icon, Layout } from '../components';
import styles from '../stylesheets/Pages.module.scss';

const links = [
  {
    href: '/overlay',
    title: 'View Overlay',
    description:
      'This is the page you want to use for your browser source. It displays your overlay in all of its beauty.',
  },
  {
    href: '/edit/overlay',
    title: 'Edit Overlay',
    description:
      'This is where you can add and remove widgets to perfect your overlay.',
  },
  {
    href: '/profile',
    title: 'Update Profile',
    description:
      'Here, you can make changes to your display name and email address.',
  },
];

const HomePage = () => (
  <Layout title="No-Code Overlays App">
    <div className={styles.Home}>
      <h2>Welcome! Here are some things you can do.</h2>
      <br />

      <div>
        {links.map((link) => (
          <Link href={link.href}>
            <a>
              <h3>
                <span>{link.title}</span>
                <span>
                  <Icon name="arrow-right" small />
                </span>
              </h3>
              <p>{link.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
);

export default HomePage;
