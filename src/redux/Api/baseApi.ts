/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchArgs } from "@reduxjs/toolkit/query/react";
import { setUser } from "../Features/Auth/authSlice";
import type { RootState } from "../store";

// export const backendBaseUrl = "http://localhost:5000";
export const backendBaseUrl = "https://astrotitan-server.onrender.com";
const baseQuery = fetchBaseQuery({
  baseUrl: `${backendBaseUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});


const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  BaseQueryApi,
  unknown
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.log("Received 401, attempting to refresh token...");

    try {
      const res = await fetch(`${backendBaseUrl}/api/v1/account/refresh-token`, {
        credentials: "include", // ✅ Send cookies with the request
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Refresh token response:", data);

      if (data?.success && data?.data?.accessToken) {
        console.log("Token refreshed successfully");

        // ✅ Update the token in Redux
        const currentUser = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user: data?.data?.user || currentUser,
            token: data?.data?.accessToken,
          })
        );

        // ✅ Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.warn("Refresh token failed:", data?.message);
        // ❌ Only logout if refresh token is expired
        // api.dispatch(logout());
      }
    } catch (error) {
      console.error("Error during refresh token:", error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: [
    "user",
    "astrologer",
    "blog",
    "puja",
    "pujaBooking",
    "product",
    "productOrder",
    "address",
    "consultation",
    "consultationChat",
    "subscription",
    "notification",
  ],
  endpoints: () => ({}),
});
