import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/Dashboard/AddContest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      }
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
        // User Routes
        {
            path: 'user-home',
            element: <div>User Home Page</div> // Placeholder
        },
        {
            path: 'my-profile',
            element: <div>My Profile Page</div> // Placeholder
        },
        // Creator Routes
        {
            path: 'add-contest',
            element: <AddContest></AddContest>
        }
    ]
  }
]);