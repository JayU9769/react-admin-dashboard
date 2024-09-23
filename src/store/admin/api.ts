import { IAdmin, IAdminForm, ILogin } from "@/interfaces/admin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants.ts";
import { IListAPIResponse } from "@/interfaces";
import {
  IDeleteAdminArgs,
  IUpdateAdminArgs,
  IUpdatePasswordArgs,
} from "./types";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/admins`,
    credentials: "include",
  }),
  tagTypes: ["Auth", "Admin"],
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
    getAdmins: builder.query<IListAPIResponse, string>({
      query: (query: string = "") => `${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ({ rows }: any) =>
        rows
          ? rows.map(({ id }: IAdmin) => ({ type: "Admin", id }))
          : ["Admin"],
    }),
    getAdminById: builder.query<IAdmin, string>({
      query: (id) => `/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: "Admin", id }],
    }),
    createAdmin: builder.mutation<IAdminForm, Partial<IAdminForm>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: builder.mutation<IAdminForm, IUpdateAdminArgs>({
      query: ({ id, updatedBody }) => ({
        url: `/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedBody,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => ["Admin"],
    }),
    deleteAdmin: builder.mutation<void, IDeleteAdminArgs>({
      query: (ids: any) => ({
        url: `/`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => ["Admin"],
    }),
    updateAdminPassword: builder.mutation<IAdminForm, IUpdatePasswordArgs>({
      query: ({ id, updatedBody }) => ({
        url: `/change-password/${id}`,
        method: "PATCH",
        body: updatedBody,
      }),
      transformResponse: ({ message }) => message,
      invalidatesTags: () => ["Admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAuthQuery,
  useLogoutMutation,
  useLazyGetAdminsQuery,
  useLazyGetAdminByIdQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
  useUpdateAdminPasswordMutation,
} = adminApi;
