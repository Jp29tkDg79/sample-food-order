import { forwardRef } from "react";

import classes from "./styles/Input.module.css";

type InputProps = {
  label: string;
  input: JSX.IntrinsicElements["input"];
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, input }, ref) => {
    return (
      <div className={classes.input}>
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input} />
      </div>
    );
  }
);

export default Input;
