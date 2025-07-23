import { createBrowserRouter } from "react-router";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/dashboard",
        element: <App/>,
        children: [
            {
                path: "home",
                element: <App/>
            },
            {
                path: "brand-tamplate",
                element: <App/>
            },
            {
                path: "asset-library",
                element: <App/>
            },
            {
                path: "project-history",
                element: <App/>
            },
            {
                path: "subscription",
                element: <App/>
            },
            {
                path: "learing-center",
                element: <App/>
            },
        ]
    }
])


export default router;