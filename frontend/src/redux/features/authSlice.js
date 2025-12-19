import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    signout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
export const { useSignoutMutation } = authAPIs;