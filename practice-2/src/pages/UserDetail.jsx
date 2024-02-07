import axios from "axios";
import React from "react";
import {
  Link,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

const UserDetail = () => {
  const user = useLoaderData();
  const navigate = useNavigate();
  // console.log(user);
  const submit = useSubmit();

  function handleDelete() {
    const proceed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (proceed) {
      try {
        console.log("before submit");
        submit(null, { method: "delete" });
        console.log("after submit"); // Trigger the deletion action
        // Navigate to the home page after successful deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again later."); // Show an error message
      }
    }
  }

  // async function handleDelete() {
  //   // try {
  //   //   console.log(user.id);
  //   //   const response = await axios.delete(`http://localhost:3000/${user.id}`);
  //   //   console.log("User deleted successfully:", response.data);
  //   //   navigate("/");
  //   //   return response.data;
  //   // } catch (error) {
  //   //   console.error("Error deleting user:", error);
  //   //   throw new Error("Failed to delete user");
  //   // }

  //   const proceed = window.confirm("are you sure");
  //   if (proceed) {
  //     submit(null);
  //     navigate("/");
  //   }
  // }
  return (
    <div>
      <ul>
        <li>{user.id}</li>
        <li>{user.username}</li>
        <li>{user.email}</li>
      </ul>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/${user.id}/edit`}>Edit User</Link>
    </div>
  );
};

export default UserDetail;

export async function loader({ params }) {
  const id = params.id;
  console.log(id);
  try {
    // console.log("vefore fetching single user");
    const response = await axios("http://localhost:3000/" + id);
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error("Why not axios fethcing this data");
  }
}

export async function action({ request, params }) {
  console.log("action is triggered");
  const id = params.id;
  try {
    console.log(id);
    const response = await axios.delete("http://localhost:3000/" + id);
    console.log("User deleted successfully:", response.data);
    // navigate("/");
    return redirect("/");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}
