import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { fetchData } from "../util/http";
import axios from "axios";

const UsersDetails = () => {
  const data = useLoaderData();
  console.log("inside the componenet", data);
  return (
    <>
      <div>UsersDetails</div>
      <ul>
        {data &&
          data.map((user, index) => (
            <div key={index}>
              <li>{user.username}</li>
              <li>{user.email}</li>
            </div>
          ))}
      </ul>

      <Link to="create-user" relative="path">
        Create new User{" "}
      </Link>
    </>
  );
};

export default UsersDetails;

export async function loader() {
  const userData = await fetchData();
  console.log("inside the loader", userData);
  return userData;
}
