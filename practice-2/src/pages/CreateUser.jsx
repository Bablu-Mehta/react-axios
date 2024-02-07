import axios from "axios";
import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";

const CreateUser = () => {
  // const user = useActionData();
  // console.log(user);
  return (
    <Form method="post">
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="email" placeholder="email" />
      <button>Submit</button>
    </Form>
  );
};

export default CreateUser;

export async function action({ request, params }) {
  const formData = await request.formData();

  const userData = {
    id: Math.floor(Math.random() * 100),
    username: formData.get("username"),
    email: formData.get("email"),
  };

  const response = await axios.post("http://localhost:3000/", userData);
  console.log(response);
  console.log("data send successfully");

  return redirect("/");
}
