import { indexSlice } from "./indexSlice";

export const serviceAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: (data) => ({
        url: "/services/add-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
    getServices: builder.query({
      query: (branchId) => ({
        url: `/services/get-services/${branchId}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/delete-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/services/update-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceAPIs;
