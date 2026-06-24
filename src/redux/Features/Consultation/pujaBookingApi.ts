import { baseApi } from "../../Api/baseApi";

const pujaBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPujaBookings: builder.query({

      query: () => ({
        url: `/puja-booking/my-bookings`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["pujaBooking"],
    }),

    bookPuja: builder.mutation({
      query: (data) => ({
        url: "/puja-booking/book",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["pujaBooking"],
    }),
  }),
});

export const {
  useGetMyPujaBookingsQuery,
  useBookPujaMutation
} = pujaBookingApi;
