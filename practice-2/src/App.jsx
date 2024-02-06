import "./App.css";
import Root from "./pages/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UsersDetails, { loader as userDataLoader } from "./pages/UsersDetails";
import CreateUser, { action as createUserAction } from "./pages/CreateUser";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <UsersDetails />, loader: userDataLoader },
      {
        path: "create-user",
        element: <CreateUser />,
        action: createUserAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
