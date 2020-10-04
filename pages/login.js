import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "../lib/api";

import { Button, Input } from "../components";
import styles from "../stylesheets/Pages.module.scss";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          onChange={(value) => {
            setEmail(value);
          }}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
        />
        <Button
          onClick={() => {
            signIn(email, password)
              .then((res) => {
                if (res.user) {
                  router.push("/");
                }
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
