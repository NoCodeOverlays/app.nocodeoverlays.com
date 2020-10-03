import { forwardRef } from "react";

import styles from "./Button.module.scss";

const Button = forwardRef((props, ref) => {
  const passableProps = {
    ...props,
    ref,
  };

  delete passableProps.children;
  delete passableProps.className;

  return (
    <button
      className={`${styles.Button} ${props.className}`}
      {...passableProps}
    >
      {props.children}
    </button>
  );
});

export default Button;
