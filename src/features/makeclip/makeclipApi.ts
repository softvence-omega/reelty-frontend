import { baseApi } from "../baseApi";

export const makeclipApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // upload video file
        uploadVideoFile: build.mutation({
            query: ({ formData }) => ({
                url: "/makeclip/upload-video",
                method: "POST",
                body: formData,
            }),
        }),


        createMakeClip: build.mutation<any, { formData: FormData }>({
            query: ({ formData }) => ({
                url: "/makeclip/create",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["makeclip"],
        }),

        // Get list of makeclips
        getMakeClipsList: build.query<any, Record<string, any>>({
            query: (params) => ({
                url: "/makeclip/list",
                method: "GET",
                params,
            }),
            providesTags: ["makeclip"],
        }),

        // Get list of makeclips
        getMakeClipListWithClip: build.query<any, Record<string, any>>({
            query: (params) => ({
                url: "/clip-segments",
                method: "GET",
                params,
            }),
            providesTags: ["makeclip"],
        }),

        // Get one makeclip by id
        getMakeClip: build.query<any, number>({
            query: (id) => ({
                url: `/makeclip/${id}`,
                method: "GET",
            }),
            providesTags: ["makeclip"],
        }),

        // Update makeclip
        updateMakeClip: build.mutation<any, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/makeclip/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["makeclip"],
        }),

        // Set default makeclip
        setDefaultMakeClip: build.mutation<any, number>({
            query: (id) => ({
                url: `/makeclip/${id}/default`,
                method: "PATCH",
            }),
            invalidatesTags: ["makeclip"],
        }),

        // Delete makeclip
        deleteMakeClip: build.mutation<any, number>({
            query: (id) => ({
                url: `/makeclip/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["makeclip"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateMakeClipMutation,
    useGetMakeClipsListQuery,
    useGetMakeClipListWithClipQuery,
    useGetMakeClipQuery,
    useUpdateMakeClipMutation,
    useSetDefaultMakeClipMutation,
    useDeleteMakeClipMutation,
    useUploadVideoFileMutation
} = makeclipApi;
