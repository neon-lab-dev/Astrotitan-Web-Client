import { baseApi } from "../../Api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
        category,
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
        category?: string;
      } = {}) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());
        if (category) params.append("category", category);

        return {
          url: `/blog?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["blog"],
    }),

    getSingleBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogByIdQuery,
} = blogApi;
