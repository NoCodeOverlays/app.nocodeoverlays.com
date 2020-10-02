import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "../lib/api";

import styles from "../stylesheets/Pages.module.scss";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.Login}>
      <div>
        <h1>Welcome to No-Code Overlays!</h1>
        <h2>Please log in to get going.</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
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
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
