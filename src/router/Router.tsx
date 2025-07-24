import { createBrowserRouter } from "react-router";
import App from "../App";
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
    }
])


export default router;