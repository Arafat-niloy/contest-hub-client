import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/Dashboard/AddContest";
import AllContests from "../pages/Dashboard/AllContests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";

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
        path: "all-contests",
        element: <AllContests></AllContests>
      },
      {
        path: "contest/:id",
        element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/contests/${params.id}`)
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