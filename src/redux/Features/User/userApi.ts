import { baseApi } from "../../Api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/account/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/account/update-profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
     getRazorpayKey: builder.query({
      query: () => ({
        url: "/get-key",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetRazorpayKeyQuery
} = userApi;
