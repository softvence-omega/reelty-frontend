import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        login: build.mutation<any, { email: string; password: string }>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        register: build.mutation<any, { firstName: string; lastName: string; email: string; password: string }>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        getProfile: build.query<any, void>({
            query: () => ({
                url: "/auth/profile",
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        logout: build.mutation<any, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["user"],
        }),
    }),

    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetProfileQuery,
    useLogoutMutation,

} = authApi;