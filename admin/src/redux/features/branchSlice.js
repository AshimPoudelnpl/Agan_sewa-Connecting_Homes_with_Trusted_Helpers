import { indexSlice } from "./indexSlice";

export const branchAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProvince: builder.mutation({
      query: (data) => ({
        url: "branch/add-province",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    getProvince: builder.query({
      query: () => ({
        url: "branch/get-province",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteProvince: builder.mutation({
      query: (id) => ({
        url: `branch/delete-province/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    addDistrict: builder.mutation({
      query: (data) => ({
        url: "branch/add-district",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    getDistrict: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `branch/get-district?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    getAllDistricts: builder.query({
      query: () => ({
        url: "branch/get-district",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    getDistrictByProvince: builder.query({
      query: (provinceId) => ({
        url: `branch/get-district/${provinceId}`,
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: `branch/delete-district/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    addBranch: builder.mutation({
      query: (data) => ({
        url: "branch/add-branch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    getBranch: builder.query({
      query: () => ({
        url: "branch/get-branch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `branch/delete-branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    editBranch: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `branch/edit-branch/${id}`,
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
  useAddDistrictMutation,
  useGetDistrictQuery,
  useLazyGetDistrictQuery,
  useGetAllDistrictsQuery,
  useGetDistrictByProvinceQuery,
  useDeleteDistrictMutation,
  useAddBranchMutation,
  useGetBranchQuery,
  useDeleteBranchMutation,
  useEditBranchMutation,
} = branchAPIs;
