import { indexSlice } from "./indexSlice";

export const siteAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    addInquiry: builder.mutation({
      query: (data) => ({
        url: "/api/add-inquiry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inquiry"],
    }),
    getInquiry: builder.query({
      query: () => ({
        url: "/api/get-inquiry",
        method: "GET",
      }),
      providesTags: ["inquiry"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: "/api/add-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    getReview: builder.query({
      query: () => ({
        url: "/api/get-review",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/api/delete-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    addTrustedCustomers: builder.mutation({
      query: (data) => ({
        url: "/api/add-trustedcustomers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customer"],
    }),
    getTrustedCustomers: builder.query({
      query: () => ({
        url: "/api/get-trustedCustomers",
        method: "GET",
      }),
      providesTags: ["customer"],
    }),
    addGallery: builder.mutation({
      query: (data) => ({
        url: "/api/add-gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gallery"],
    }),
    getGallery: builder.query({
      query: () => ({
        url: "/api/get-gallery",
        method: "GET",
      }),
      providesTags: ["gallery"],
    }),
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/api/delete-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useAddInquiryMutation,
  useGetInquiryQuery,
  useAddReviewMutation,
  useGetReviewQuery,
  useDeleteReviewMutation,
  useAddTrustedCustomersMutation,
  useGetTrustedCustomersQuery,
  useAddGalleryMutation,
  useGetGalleryQuery,
  useDeleteGalleryMutation,
} = siteAPIs;