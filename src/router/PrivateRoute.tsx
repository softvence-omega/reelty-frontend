import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../store";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, initialized } = useSelector(
    (state: RootState) => state.auth
  );

  // ✅ If auth state is not yet initialized, render null or loader
  if (!initialized) return null; // বা <Loading /> component

  return isLoggedIn ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
