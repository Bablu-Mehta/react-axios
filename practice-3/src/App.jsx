import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import UsersList, { loader as usersLoader } from "./pages/UsersList";
import UserDetails, {
  loader as userLoader,
  action as userDeleteAction,
} from "./pages/UserDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "users",
          name: "users-list",
          element: <UsersList />,
          loader: usersLoader,
          children: [
            {
              path: ":id",
              element: <UserDetails />,
              loader: userLoader,
              action: userDeleteAction,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
