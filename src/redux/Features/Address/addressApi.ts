import { baseApi } from "../../Api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddresses: builder.query({
      query: ({
        limit,
        page,
        skip,
      }: {
        limit?: number;
        page?: number;
        skip?: number;
      } = {}) => {
        const params = new URLSearchParams();
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/address/my?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["address"],
    }),

    getSingleAddressById: builder.query({
      query: (id) => ({
        url: `/address/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["address"],
    }),

    addAddress: builder.mutation({
      query: (data) => ({
        url: "/address/add",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["address"],
    }),

    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/address/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["address"],
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["address"],
    }),
  }),
});

export const {
  useGetMyAddressesQuery,
  useGetSingleAddressByIdQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
