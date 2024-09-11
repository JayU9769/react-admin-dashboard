import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "@/lib/constants.ts";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: string = "") => `/users${query}`,
    })
  }),
});

export const {
  useLazyGetUsersQuery,
} = rootApi;
