import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  // let title = "An Error Occured!";
  let message = "yooo";

  if (error.status === 500) {
    message = error.data.message;
  }

  // if (error.status === 404) {
  //   title = "Not Found!";
  //   message = "Could not Find resource or Page.";
  // }
  return <div>{message}</div>;
};

export default Error;
