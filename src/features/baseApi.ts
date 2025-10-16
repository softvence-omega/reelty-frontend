/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // BaseQueryApi,
  // BaseQueryFn,
  // DefinitionType,
  // FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// import { logout, setUser } from "../features/auth/authSlice";
// import { message } from "antd";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://reelty.com.au/api/v1",
  credentials: "omit",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// const baseQueryWithRefreshToken: BaseQueryFn<
//   FetchArgs,
//   BaseQueryApi,
//   DefinitionType
// > = async (args, api, extraOptions): Promise<any> => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 404) {
//     message.error((result as any).error.data.message); // Ant Design error message
//   }
//   if (result?.error?.status === 403) {
//     message.error((result as any).error.data.message); // Ant Design error message
//   }
//   if (result?.error?.status === 401) {
//     //* Send Refresh

//     const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();

//     if (data?.data?.accessToken) {
//       const user = (api.getState() as any).auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "user", "template", "makeclip"
  ],
  endpoints: () => ({}),
});