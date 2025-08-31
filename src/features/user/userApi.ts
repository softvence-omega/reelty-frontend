import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileData: build.query<any, string>({ // <any, string> because id is a string
            query: () => ({
                url: `/users/single-user`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),

        userSelfDelete: build.mutation<any, string>({
            query: (id) => ({
                url: `/users/remove-self/${id}`,
                method: "DELETE",
            }),
        })
    }),
    overrideExisting: false,
});

export const { useGetProfileDataQuery, useUserSelfDeleteMutation } = userApi;
