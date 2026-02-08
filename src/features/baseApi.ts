/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { store } from "../store";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://reelty-be-0ee7.onrender.com/api/v1",
  credentials: "omit",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// wrapper baseQuery
const baseQueryWithReauth: any = async (args: any, api: any, extraOptions: any) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    store.dispatch(logout());
    window.location.href = "/auth/login";
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth, 
  tagTypes: ["user", "template", "makeclip"],
  endpoints: () => ({}),
});