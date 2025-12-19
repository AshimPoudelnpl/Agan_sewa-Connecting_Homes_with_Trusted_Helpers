import { indexSlice } from "./indexSlice";

export const branchAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProvince: builder.mutation({
      query: (data) => ({
        url: "/api/add-province",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    getProvince: builder.query({
      query: () => ({
        url: "/api/get-province",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteProvince: builder.mutation({
      query: (id) => ({
        url: `/api/delete-province/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    getDistrict: builder.query({
      query: () => ({
        url: "/api/get-district",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: `/api/delete-district/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/api/add-branch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    getBranch: builder.query({
      query: () => ({
        url: "/api/get-branch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/api/delete-branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    editBranch: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/edit-branch/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
  }),
});

export const {
  useAddProvinceMutation,
  useGetProvinceQuery,
  useDeleteProvinceMutation,
  useGetDistrictQuery,
  useDeleteDistrictMutation,
  useAddBranchMutation,
  useGetBranchQuery,
  useDeleteBranchMutation,
  useEditBranchMutation,
} = branchAPIs;
