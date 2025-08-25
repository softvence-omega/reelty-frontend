import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router";
import { initializeAuth } from "../../features/auth/authSlice";
import router from "../../router/Router";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth()); // page load এ token restore করবে
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default AppWrapper;
