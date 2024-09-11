import { IAdmin, ILogin } from "@/interfaces/admin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "@/lib/constants.ts";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/admins`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<IAdmin, Partial<ILogin>>({
      query: (cred) => ({
        url: "/login",
        method: "POST",
        body: cred,
      }),
      transformErrorResponse: ({ data }) => data,
      transformResponse: (response: { data: IAdmin }) => response.data,
    }),
    getAuth: builder.query<IAdmin, void>({
      query: () => `/profile`,
      transformResponse: ({ data }) => data,
      providesTags: (result) =>
        result ? [{ type: "Auth", id: "PROFILE" }] : [],
    }),
    logout: builder.mutation<IAdmin, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        body: {},
      }),
      transformErrorResponse: ({ data }) => data,
      transformResponse: (response: { data: IAdmin }) => response.data,
    }),
  }),
});

export const { useLoginMutation, useGetAuthQuery, useLogoutMutation } =
  adminApi;
