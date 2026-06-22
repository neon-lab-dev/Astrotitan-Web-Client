import { baseApi } from "../../Api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
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
          url: `/product?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductByIdQuery
} = productApi;
