import React, { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(({ label, id, ...props }, ref) => {
  return (
    <div className={classes.container}>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});

export default Input;
