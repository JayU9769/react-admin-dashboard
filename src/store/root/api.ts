import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: string = '') => `/users${query}`,
    }),
  }),
});

export const {
  useLazyGetUsersQuery
} = rootApi;
