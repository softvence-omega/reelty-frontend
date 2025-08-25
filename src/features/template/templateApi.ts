import { baseApi } from "../baseApi";

export const templateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create template
    createTemplate: build.mutation<
      any,
      { formData: FormData } // because we have files
    >({
      query: ({ formData }) => ({
        url: "/templates/create-template",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"], // or you can use "templates"
    }),

    // Get list of templates
    getTemplatesList: build.query<any, Record<string, any>>({
      query: (params) => ({
        url: "/templates/templates-list",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),

    // Get one template by id
    getTemplate: build.query<any, number>({
      query: (id) => ({
        url: `/templates/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Update template
    updateTemplate: build.mutation<
      any,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/templates/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    // Set default template
    setDefaultTemplate: build.mutation<any, number>({
      query: (id) => ({
        url: `/templates/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    // Delete template
    deleteTemplate: build.mutation<any, number>({
      query: (id) => ({
        url: `/templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTemplateMutation,
  useGetTemplatesListQuery,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useSetDefaultTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;
