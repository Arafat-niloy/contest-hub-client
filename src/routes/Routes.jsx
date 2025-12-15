import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";

// General Pages
import AllContests from "../pages/Dashboard/AllContests"; 
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import Payment from "../pages/Payment/Payment";

// Dashboard Common Pages
import Profile from "../pages/Profile/Profile"; 
import DashboardHome from "../pages/Dashboard/DashboardHome"; 

// Dashboard - User Pages
import MyParticipated from "../pages/Dashboard/MyParticipated/MyParticipated";
import SubmitTask from "../pages/Dashboard/SubmitTask"; 
import MyWinning from "../pages/Dashboard/MyWinning"; // ✅ ইমপোর্ট যুক্ত করা হয়েছে

// Dashboard - Creator Pages
import AddContest from "../pages/Dashboard/AddContest";
import MyCreatedContest from "../pages/Dashboard/MyCreatedContest/MyCreatedContest";
import ContestSubmitted from "../pages/Dashboard/MyCreatedContest/ContestSubmitted"; 

// Dashboard - Admin Pages
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageContests from "../pages/Dashboard/ManageContests/ManageContests";

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
        element: <AllContests></AllContests>,
      },
      {
        path: "contest/:id",
        element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`),
      },
      {
        path: "payment/:id",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // =================================================
      // DASHBOARD DEFAULT (STATS / HOME)
      // =================================================
      {
        index: true,
        element: <DashboardHome></DashboardHome>, 
      },

      // =================================================
      // COMMON DASHBOARD ROUTES (For All Users)
      // =================================================
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },

      // =================================================
      // USER ROUTES
      // =================================================
      {
        path: "my-participated",
        element: <MyParticipated></MyParticipated>,
      },
      {
        path: "my-winning", 
        element: <MyWinning></MyWinning>, // ✅ এই নতুন রাউটটি যোগ করা হয়েছে
      },
      {
        path: "payment/submit/:id", // :id = Payment _id
        element: <SubmitTask></SubmitTask>,
      },

      // =================================================
      // CREATOR ROUTES
      // =================================================
      {
        path: "add-contest",
        element: <AddContest></AddContest>,
      },
      {
        path: "my-created",
        element: <MyCreatedContest></MyCreatedContest>,
      },
      {
        path: "contest/submitted/:id", // :id = Contest _id
        element: <ContestSubmitted></ContestSubmitted>,
      },

      // =================================================
      // ADMIN ROUTES
      // =================================================
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manage-contests",
        element: <ManageContests></ManageContests>,
      },
    ],
  },
]);