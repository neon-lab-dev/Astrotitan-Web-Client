import { baseApi } from "../../Api/baseApi";

const pujaBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPuja: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
        category,
        intent
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
        category?: string;
        intent?: string;
      } = {}) => {
        const params = new URLSearchParams();

        if (keyword && keyword !== "All") {
          params.append("keyword", keyword);
        }
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());
        if (category && category !== "All") {
          params.append("category", category);
        }
        if (intent && intent !== "All") {
          params.append("intent", intent);
        }

        return {
          url: `/puja?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["puja"],
    }),

    getSinglePujaById: builder.query({
      query: (id) => ({
        url: `/puja/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["puja"],
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
  useGetAllPujaQuery,
  useGetSinglePujaByIdQuery,
  useBookPujaMutation
} = pujaBookingApi;
