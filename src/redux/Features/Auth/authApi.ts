import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (loginData) => ({
        url: "/account/signup",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    verifyLoginOtp: builder.mutation({
      query: (data) => ({
        url: "/account/verify-login-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resendLoginOtp: builder.mutation({
      query: (data) => ({
        url: "/account/resend-login-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    signup: builder.mutation({
      query: (loginData) => ({
        url: "/account/signup",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    verifySignupOtp: builder.mutation({
      query: (data) => ({
        url: "/account/verify-signup-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resendSignupOtp: builder.mutation({
      query: (data) => ({
        url: "/account/resend-signup-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    completeUserProfile: builder.mutation({
      query: (data) => ({
        url: "/account/complete-profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyLoginOtpMutation,
  useResendLoginOtpMutation,
  useSignupMutation,
  useVerifySignupOtpMutation,
  useResendSignupOtpMutation,
  useCompleteUserProfileMutation
} = authApi;
