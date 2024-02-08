import axios from "axios";
import React from "react";
import { Link, Outlet, json, useLoaderData } from "react-router-dom";

const UsersList = () => {
  const users = useLoaderData();
  return (
    <>
      <div>
        <ul>
          {users.map((user) => (
            <div key={user.id}>
              <li>{user.id}</li>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <Link to={`${user.id}`}>User Detail</Link>
            </div>
          ))}
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default UsersList;

export async function loader() {
  try {
    const response = await axios("http://localhost:3000/");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw json({
      message: "something went wrong while fetching the data from server.",
    });
  }
}
