import { baseApi } from "../../Api/baseApi";

const astrologerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAstrologers: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
        gender,
        areaOfPractice,
        consultLanguages,
        sortBy
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
        gender?: string;
        areaOfPractice?: string;
        consultLanguages?: string;
        sortBy?: string;
      } = {}) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());
        if (gender) params.append("gender", gender);
        if (areaOfPractice) params.append("areaOfPractice", areaOfPractice);
        if (consultLanguages) params.append("consultLanguages", consultLanguages);
        if (sortBy) params.append("sortBy", sortBy);

        return {
          url: `/astrologer?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["astrologer"],
    }),

    getSingleAstrologerById: builder.query({
      query: (id) => ({
        url: `/astrologer/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["astrologer"],
    }),
  }),
});

export const {
  useGetAllAstrologersQuery,
  useGetSingleAstrologerByIdQuery
} = astrologerApi;
