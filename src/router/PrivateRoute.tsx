import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { Navigate } from "react-router"
import type { ReactNode } from "react"

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn)
    return isAuthenticated ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;