import React, { useEffect } from "react";
import { Link, useLoaderData, useSubmit } from "react-router-dom";
import { fetchData } from "../util/http";
import axios from "axios";

const UsersDetails = () => {
  const data = useLoaderData();
  // console.log("inside the componenet", data);
  const submit = useSubmit();

  return (
    <>
      <div>UsersDetails</div>
      <ul>
        {data &&
          data.map((user, index) => (
            <div key={index}>
              <li>{user.id}</li>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <Link to={`/${user.id}`}>User Details</Link>
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
  // console.log("inside the loader", userData);
  return userData;
}


