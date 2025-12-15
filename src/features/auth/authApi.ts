/* eslint-disable @typescript-eslint/no-explicit-any */
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
        googleCallback: build.query<any, void>({
            query: () => ({
                url: "/google/callback",
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        activeStatus: build.query<any, void>({
            query: () => ({
                url: "/payments/subscription/status",  // Correct endpoint
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        verifyEmail: build.mutation<any, string>({
            query: (token) => ({
                url: `/auth/verify-email?token=${token}`,
                method: "GET",
           
            }),
            invalidatesTags: ["user"],
        }),

        logout: build.mutation<any, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["user"],
        }),
        resetPass: build.mutation<any, { email: string }>({
            query: (data) => ({
                url: "/auth/request-password-reset",  // Your backend endpoint
                method: "POST",
                body: data,  // Passing data which will contain the email
            }),
            invalidatesTags: ["user"], // This invalidates the 'user' tag if needed
        }),
        resetPassWithNewPass: build.mutation<any, { token: string, password: string }>({
            query: (data) => ({
                url: "/auth/reset-password",  // Correct endpoint
                method: "POST",
                body: data,  // Passing data which will contain the email
            }),
            invalidatesTags: ["user"], // This invalidates the 'user' tag if needed
        }),
        payment: build.mutation<any, { plan: string, billingCycle: string, price?: string }>({
            query: (data) => ({
                url: "payments/subscription",  // Correct endpoint
                method: "POST",
                body: data,  // Passing data which will contain the email
            }),
            invalidatesTags: ["user"], // This invalidates the 'user' tag if needed
        }),
        verifyPayment: build.mutation<any, { sessionId: string }>({
            query: (data) => ({
                url: "/payments/verify-session",  // Correct endpoint
                method: "POST",
                body: data,  // Passing data which will contain the email
            }),
            invalidatesTags: ["user"], // This invalidates the 'user' tag if needed
        }),


    }),

    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetProfileQuery,
    useLogoutMutation,
    useResetPassMutation,
    useResetPassWithNewPassMutation,
    usePaymentMutation,
    useGoogleCallbackQuery,
    useVerifyPaymentMutation,
    useActiveStatusQuery,
    useVerifyEmailMutation

} = authApi;