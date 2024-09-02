import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: string = "") => `/users${query}`,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id: string) => `/users/${id}`
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    // Update an existing user
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/users/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
    // Delete a user
    deleteUser: builder.mutation({
      query: (ids) => ({
        url: `/users`,
        method: "DELETE",
        body: {
          ids: ids
        }
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
