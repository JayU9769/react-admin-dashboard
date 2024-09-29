import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/interfaces/user.ts";
import { IUpdatePasswordArgs, IUpdateUserArgs } from "./types.ts";
import { EAPITags, IListAPIResponse, IUpdateAction, TIds } from "@/interfaces";
import { API_BASE_URL } from "@/lib/constants.ts";

// Create API service
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/users`,
    credentials: "include",
  }),
  tagTypes: [EAPITags.USER],
  endpoints: (builder) => ({
    getUsers: builder.query<IListAPIResponse, string>({
      query: (query: string = "") => `${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ({ rows }: any) => (rows ? rows.map(({ id }: IUser) => ({ type: EAPITags.USER, id })) : [EAPITags.USER]),
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: EAPITags.USER, id }],
    }),
    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: [EAPITags.USER],
    }),
    updateUser: builder.mutation<IUser, IUpdateUserArgs>({
      query: ({ id, updatedUser }) => ({
        url: `/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedUser,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => [EAPITags.USER],
    }),
    updateUserAction: builder.mutation<void, IUpdateAction>({
      query: (payload) => ({
        url: `/update-action`,
        method: "POST", // Use "PATCH" if you prefer partial updates
        body: payload,
      }),
      invalidatesTags: () => [EAPITags.USER],
    }),
    deleteUser: builder.mutation<void, TIds>({
      query: (ids: TIds) => ({
        url: `/`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => [EAPITags.USER],
    }),
    updateUserPassword: builder.mutation<IUser, IUpdatePasswordArgs>({
      query: ({ id, updatedBody }) => ({
        url: `change-password/${id}`,
        method: "PATCH",
        body: updatedBody,
      }),
      transformResponse: ({ message }) => message,
      invalidatesTags: () => [EAPITags.USER],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useUpdateUserActionMutation, useDeleteUserMutation, useUpdateUserPasswordMutation } = userApi;
