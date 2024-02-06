import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import classes from "./CreatingData.module.css";
import { useForm } from "react-hook-form";
import { schema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const url = "https://react-http-a309a-default-rtdb.firebaseio.com/user.json";

const CreatingData = () => {
  const [userData, setUserData] = useState("");
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
    setUserData(data);
    reset();
  };

  const userDataSubmission = async (data) => {
    try {
      const response = await axios.post(url, { user: data });
    } catch (error) {
      throw new Error("Failed to send the data.");
    }
  };

  useEffect(() => {
    const sendReq = async () => {
      if (userData) {
        await userDataSubmission(userData);
        console.log("data send successfully");
      }
    };

    sendReq();
  }, [userData]);

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

        <button type="submit" className={classes.button}>
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatingData;
