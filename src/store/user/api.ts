import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/interfaces/user.ts";
import { IUpdatePasswordArgs, IUpdateUserArgs } from "./types.ts";
import { IListAPIResponse, IUpdateAction, TIds } from "@/interfaces";
import { API_BASE_URL } from "@/lib/constants.ts";

// Create API service
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/users`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IListAPIResponse, string>({
      query: (query: string = "") => `${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ({ rows }: any) =>
        rows ? rows.map(({ id }: IUser) => ({ type: "User", id })) : ["User"],
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUser, IUpdateUserArgs>({
      query: ({ id, updatedUser }) => ({
        url: `/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedUser,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => ["User"],
    }),
    updateUserAction: builder.mutation<void, IUpdateAction>({
      query: (payload) => ({
        url: `/update-action`,
        method: "POST", // Use "PATCH" if you prefer partial updates
        body: payload,
      }),
      invalidatesTags: () => ["User"],
    }),
    deleteUser: builder.mutation<void, TIds>({
      query: (ids: TIds) => ({
        url: `/`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => ["User"],
    }),
    updateUserPassword: builder.mutation<IUser, IUpdatePasswordArgs>({
      query: ({ id, updatedBody }) => ({
        url: `change-password/${id}`,
        method: "PATCH",
        body: updatedBody,
      }),
      transformResponse: ({ message }) => message,
      invalidatesTags: () => ["User"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUsersQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserActionMutation,
  useDeleteUserMutation,
  useUpdateUserPasswordMutation,
} = userApi;
