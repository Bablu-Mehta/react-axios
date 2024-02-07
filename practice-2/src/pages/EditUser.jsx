import axios from "axios";
import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditUser = () => {
  const params = useParams();
  const user = useLoaderData();
  const navigate = useNavigate();
  //   console.log("id in component", params.id);
  //   console.log("user data", user);
  function handleCancel() {
    navigate("../");
  }

  return (
    <>
      <Form method="put">
        <div>
          <input
            type="text"
            name="username"
            defaultValue={user && user.username}
          />
          <input type="text" name="email" defaultValue={user && user.email} />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button>Update</button>
        </div>
      </Form>
    </>
  );
};

export default EditUser;

export async function loader({ params }) {
  const id = params.id;
  //   console.log("id in loader", id);
  try {
    const response = await axios("http://localhost:3000/" + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching the data");
  }
  //   return null;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const userData = {
    // id: params.id,
    username: formData.get("username"),
    email: formData.get("email"),
  };

  try {
    const response = await axios.put(
      `http://localhost:3000/${params.id}/edit`,
      userData
    );
  } catch (error) {
    throw new Error("Was not abel to update the user data");
  }

  return redirect("..");
}
