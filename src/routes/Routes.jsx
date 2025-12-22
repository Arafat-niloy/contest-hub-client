import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";

// General Pages
import AllContests from "../pages/Dashboard/AllContests"; 
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import Payment from "../pages/Payment/Payment";
import Leaderboard from "../pages/Leaderboard/Leaderboard"; 

// Dashboard Common Pages
import Profile from "../pages/Profile/Profile"; 
import DashboardHome from "../pages/Dashboard/DashboardHome"; 

// Dashboard - User Pages
import MyParticipated from "../pages/Dashboard/MyParticipated/MyParticipated";
import SubmitTask from "../pages/Dashboard/SubmitTask"; 
import MyWinning from "../pages/Dashboard/MyWinning"; 

// Dashboard - Creator Pages
import AddContest from "../pages/Dashboard/AddContest";
import MyCreatedContest from "../pages/Dashboard/MyCreatedContest/MyCreatedContest";
import ContestSubmitted from "../pages/Dashboard/MyCreatedContest/ContestSubmitted"; 
import EditContest from "../pages/Dashboard/Creator/EditContest"; 

// Dashboard - Admin Pages
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageContests from "../pages/Dashboard/ManageContests/ManageContests";

// বেস ইউআরএল সেট করে রাখা যাতে বারবার লিখতে না হয়
const API_URL = "https://contesthub-server-psi.vercel.app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "leaderboard", 
        element: <Leaderboard></Leaderboard>,
      },
      {
        path: "contest/:id",
        element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>,
        // ✅ আপডেট করা হয়েছে: লোকালহোস্ট পরিবর্তন করে ভেরসেল লিঙ্ক দেওয়া হয়েছে
        loader: ({ params }) => fetch(`${API_URL}/contests/${params.id}`),
      },
      {
        path: "payment/:id",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
        // ✅ আপডেট করা হয়েছে: লোকালহোস্ট পরিবর্তন করে ভেরসেল লিঙ্ক দেওয়া হয়েছে
        loader: ({ params }) => fetch(`${API_URL}/contests/${params.id}`),
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>, 
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: "my-participated",
        element: <MyParticipated></MyParticipated>,
      },
      {
        path: "my-winning", 
        element: <MyWinning></MyWinning>,
      },
      {
        path: "payment/submit/:id", 
        element: <SubmitTask></SubmitTask>,
      },
      {
        path: "add-contest",
        element: <AddContest></AddContest>,
      },
      {
        path: "my-created",
        element: <MyCreatedContest></MyCreatedContest>,
      },
      {
        path: "contest/submitted/:id", 
        element: <ContestSubmitted></ContestSubmitted>,
      },
      {
        path: "contest/edit/:id",
        element: <EditContest></EditContest>
      },
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
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);