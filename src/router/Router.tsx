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
    path: "/dashboard",
    element: <DashLayout />,
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
        path: "asset-library",
        element: <AssetLibrary />,
      },
      {
        path: "project-history",
        element: <ProjectHistory />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "learning-center",
        element: <LearningCenter />,
      },
    ],
  },
]);


export default router;
