import { indexSlice } from "./indexSlice";

export const staffAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/api/staff/add-staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
    getStaff: builder.query({
      query: () => ({
        url: "/api/staff/get-staff",
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/api/staff/delete-staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
    editStaff: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/staff/edit-staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
  }),
});

export const {
  useAddStaffMutation,
  useGetStaffQuery,
  useDeleteStaffMutation,
  useEditStaffMutation,
} = staffAPIs;