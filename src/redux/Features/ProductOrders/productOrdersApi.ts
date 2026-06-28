import { baseApi } from "../../Api/baseApi";

const productOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProductOrders: builder.query({
      query: ({
        keyword,
        page,
        status,
      }: {
        keyword?: string;
        page?: number;
        status?: string;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());
        if (status && status !== "All") {
          params.append("status", status);
        }

        return {
          url: `/product-order/my-orders${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["productOrder"],
    }),

    getOrderStatus: builder.query({
      query: (id) => ({
        url: `/product-order/status/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productOrder"],
    }),

    productCheckout: builder.mutation({
      query: (data) => ({
        url: `/product-order/checkout`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `/product-order/verify-payment`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),

    createProductOrder: builder.mutation({
      query: (data) => ({
        url: `/product-order/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),
  }),
});

export const {
  useGetMyProductOrdersQuery,
  useGetOrderStatusQuery,
  useProductCheckoutMutation,
  useVerifyPaymentMutation,
  useCreateProductOrderMutation
} = productOrdersApi;
