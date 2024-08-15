import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      // Will make a request like https://pokeapi.co/api/v2/pokemon/bulbasaur
      query: (query: string = '') => `/users${query}`,
    }),
  }),
});

export const {
  useGetUsersQuery
} = rootApi;
