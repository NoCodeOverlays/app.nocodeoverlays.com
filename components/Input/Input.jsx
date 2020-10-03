import { forwardRef } from "react";

import styles from "./Input.module.scss";

const Input = forwardRef((props, ref) => {
  const passableProps = {
    ...props,
    ref,
  };

  delete passableProps.className;

  return (
    <div className={`${styles.Input} ${props.className}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        {...passableProps}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
});

export default Input;
