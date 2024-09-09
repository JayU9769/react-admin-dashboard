import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/interfaces/user.ts";
import { IDeleteUserArgs, IUpdateUserArgs } from "@/store/user/types.ts";
import { IListAPIResponse } from "@/interfaces";

// Create API service
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IListAPIResponse, string>({
      query: (query: string = "") => `/users${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ({ rows }: any) =>
        rows ? rows.map(({ id }: IUser) => ({ type: "User", id })) : ["User"],
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUser, IUpdateUserArgs>({
      query: ({ id, updatedUser }) => ({
        url: `/users/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedUser,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => ["User"],
    }),
    deleteUser: builder.mutation<void, IDeleteUserArgs>({
      query: (ids: any) => ({
        url: `/users`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => ["User"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyGetUsersQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
