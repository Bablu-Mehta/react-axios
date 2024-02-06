import React from "react";
import classes from "./Input.module.css";

const Input = ({ label }, props) => {
  return (
    <div className={classes.container}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
};

export default Input;
