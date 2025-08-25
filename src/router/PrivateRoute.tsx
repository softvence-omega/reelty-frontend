import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../store";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
