import React from "react";
import Input from "../UI/Input";
import classes from "./CreatingData.module.css";
import { useForm } from "react-hook-form";
import { schema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";

const CreatingData = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
    },
  });

  const handleSubmission = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form
        className={classes.container}
        noValidate
        onSubmit={handleSubmit(handleSubmission)}
      >
        <Input id="fullname" label="FullName" {...register("fullname")} />
        {errors.fullname && (
          <p className={classes.error}>{errors.fullname?.message}</p>
        )}
        <Input id="username" label="UserName" {...register("username")} />
        {errors.username && (
          <p className={classes.error}>{errors.username?.message}</p>
        )}

        <Input id="email" label="Email" {...register("email")} />
        {errors.email && (
          <p className={classes.error}>{errors.email?.message}</p>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreatingData;
