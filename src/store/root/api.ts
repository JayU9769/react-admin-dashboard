import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: string = '') => `/users${query}`,
    }),
  }),
});

export const {
  useGetUsersQuery
} = rootApi;
