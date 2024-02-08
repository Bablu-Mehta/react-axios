import axios from "axios";
import React from "react";
import { json, redirect, useLoaderData, useSubmit } from "react-router-dom";

const UserDetails = () => {
  const user = useLoaderData();
  const submit = useSubmit();
  //   console.log("iside the component", id);

  function handleDeleteUser() {
    const proceed = window.confirm("Are Sure!!!");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }
  return (
    <div>
      <ul>
        <li>{user.id}</li>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <button onClick={handleDeleteUser}>Delete</button>
        <button>Edit</button>
      </ul>
    </div>
  );
};

export default UserDetails;

export async function loader({ params }) {
  const id = params.id;
  //   console.log("inside the loader", id);
  try {
    const response = await axios("http://localhost:3000/" + id);
    return response.data;
  } catch (error) {
    throw json({
      messgae: "something went wrong while fetching the user detail",
    });
  }
  //   console.log("respoonse", response.data);
}

export async function action({ request, params }) {
  const id = params.id;
//   console.log("inside the deleting action", id);
  try {
    const response = await axios.delete("http://localhost:3000/" + id);
    return redirect("/users");
  } catch (error) {
    throw json({ message: "something went wrong while deleting the user" });
  }
}
