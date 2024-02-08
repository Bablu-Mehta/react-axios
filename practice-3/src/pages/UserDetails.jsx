import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";

const UserDetails = () => {
  const user = useLoaderData();
  //   console.log("iside the component", id);
  return (
    <div>
      <ul>
        <li>{user.id}</li>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <button>Delete</button>
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
