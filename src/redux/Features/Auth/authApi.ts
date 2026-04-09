import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    
    sendOtp: builder.mutation({
      query: (userInfo) => ({
        url: "/send-otp",
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    setupProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    verifyOtp: builder.mutation({
      query: (verifyOtpData) => ({
        url: "/verify-otp",
        method: "POST",
        body: verifyOtpData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    logoutUser: builder.query({
      query: () => ({
        method: "PUT",
        url: `/logout`,
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/password/forgot",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resetPassword: builder.mutation({
      query: ({resetPasswordData, token}) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),


  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useSetupProfileMutation,
  useVerifyOtpMutation,
  useLogoutUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
