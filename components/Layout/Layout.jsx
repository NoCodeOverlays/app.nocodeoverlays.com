import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getUser, signOut } from "../../lib/api";
import styles from "./Layout.module.scss";

const Layout = ({ title, children }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className={styles.Layout}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <h1>No-Code Overlays</h1>
        <div>
          <span>Hey, {user.email}!</span>
          <button
            onClick={() => {
              signOut().then(() => {
                setUser();
              });
            }}
          >
            Sign Out
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
