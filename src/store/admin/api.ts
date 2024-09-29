import { IAdmin, IAdminForm, ILogin } from "@/interfaces/admin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants.ts";
import { EAPITags, IListAPIResponse, IUpdateAction, TIds } from "@/interfaces";
import { IProfileUpdatePasswordArgs, IProfileUpdateProfilArgs, IUpdateAdminArgs, IUpdatePasswordArgs } from "./types";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/admins`,
    credentials: "include",
  }),
  tagTypes: [EAPITags.AUTH, EAPITags.ADMIN],
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
      providesTags: (result) => (result ? [{ type: EAPITags.AUTH, id: "PROFILE" }] : []),
    }),
    updateProfile: builder.mutation<IAdmin, IProfileUpdateProfilArgs>({
      query: ({ updatedBody }) => ({
        url: "/profile",
        method: "PATCH",
        body: updatedBody,
      }),
      transformErrorResponse: ({ data }) => data,
      transformResponse: (response: { data: IAdmin }) => response.data,
      invalidatesTags: [{ type: EAPITags.AUTH, id: "PROFILE" }],
    }),
    updateProfilePassword: builder.mutation<IAdmin, IProfileUpdatePasswordArgs>({
      query: ({ updatedBody }) => ({
        url: "/change-password",
        method: "PUT",
        body: updatedBody,
      }),
      transformErrorResponse: ({ data }) => data,
      transformResponse: ({ message }) => message,
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
      providesTags: ({ rows }: any) => (rows ? rows.map(({ id }: IAdmin) => ({ type: EAPITags.ADMIN, id })) : [EAPITags.ADMIN]),
    }),
    getAdminById: builder.query<IAdmin, string>({
      query: (id) => `/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: EAPITags.ADMIN, id }],
    }),
    createAdmin: builder.mutation<IAdminForm, Partial<IAdminForm>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: [EAPITags.ADMIN],
    }),
    updateAdmin: builder.mutation<IAdminForm, IUpdateAdminArgs>({
      query: ({ id, updatedBody }) => ({
        url: `/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedBody,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => [EAPITags.ADMIN],
    }),
    updateAdminAction: builder.mutation<void, IUpdateAction>({
      query: (payload) => ({
        url: `/update-action`,
        method: "POST", // Use "PATCH" if you prefer partial updates
        body: payload,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => [EAPITags.ADMIN],
    }),
    deleteAdmin: builder.mutation<void, TIds>({
      query: (ids: TIds) => ({
        url: `/`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => [EAPITags.ADMIN],
    }),
    updateAdminPassword: builder.mutation<IAdminForm, IUpdatePasswordArgs>({
      query: ({ id, updatedBody }) => ({
        url: `/change-password/${id}`,
        method: "PATCH",
        body: updatedBody,
      }),
      transformResponse: ({ message }) => message,
      invalidatesTags: () => [EAPITags.ADMIN],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAuthQuery,
  useLogoutMutation,
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useUpdateAdminActionMutation,
  useDeleteAdminMutation,
  useUpdateAdminPasswordMutation,
  useUpdateProfileMutation,
  useUpdateProfilePasswordMutation,
} = adminApi;
