import { createBrowserRouter } from "react-router";
import App from "../App";
import DashLayout from "../pages/dashboard/DashLayout";
import Home from "../pages/dashboard/home/Home";
import BrandTeamplate from "../pages/dashboard/brand_template/BrandTeamplate";
import AssetLibrary from "../pages/dashboard/asset_library/AssetLibrary";
import ProjectHistory from "../pages/dashboard/project_history/ProjectHistory";
import Subscription from "../pages/dashboard/subscription/Subscription";
import LearningCenter from "../pages/dashboard/learning_center/LearningCenter";
import GetClips from "../pages/dashboard/home/get_clips/GetClips";
import LoginPage from "../pages/login/Login";
import SignUpPage from "../pages/signup/SignUp";
import PrivateRoute from "./PrivateRoute";
import CreateTeamplate from "../pages/dashboard/brand_template/CreateTeamplate";
import SingleProjectClips from "../pages/dashboard/single_project_clips/SingleProjectClips";
import ResetPassword from "../pages/login/ResetPassword";
import ResetPasswordWithToken from "../pages/login/ResetPasswordWithToken";
import GoogleCallback from "../pages/googleAuth/GoogleCallback";
import UserAlreadyDeleted from "../pages/googleAuth/UserAlreadyDeleted";
import PaymentSuccess from "../pages/payment/PaymentSuccess";

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleCallback />,
  },
  {
    path: "/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/auth/user-deleted",
    element: <UserAlreadyDeleted />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordWithToken />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "get-clips",
        element: <GetClips />,
      },
      {
        path: "brand-template",
        element: <BrandTeamplate />,
      },
      {
        path: "create-template",
        element: <CreateTeamplate />,
      },
      {
        path: "asset-library",
        element: <AssetLibrary />,
      },
      {
        path: "project-history",
        element: <ProjectHistory />,
      },
      {
        path: "project-clips/:id",
        element: <SingleProjectClips />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      // {
      //   path: "learning-center",
      //   element: <LearningCenter />,
      // },
    ],
  },
]);

export default router;
