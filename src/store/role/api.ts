import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRole } from "@/interfaces/role.ts";
import { IDeleteRoleArgs, IUpdateRoleArgs } from "./types.ts";
import { IListAPIResponse } from "@/interfaces";
import { API_BASE_URL } from "@/lib/constants.ts";

// Create API service
export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    getRoles: builder.query<IListAPIResponse, string>({
      query: (query: string = "") => `/roles${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ({ rows }: any) =>
        rows ? rows.map(({ id }: IRole) => ({ type: "Role", id })) : ["Role"],
    }),
    getRoleById: builder.query<IRole, string>({
      query: (id) => `/roles/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: "Role", id }],
    }),
    createRole: builder.mutation<IRole, Partial<IRole>>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body: body,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation<IRole, IUpdateRoleArgs>({
      query: ({ id, updatedBody }) => ({
        url: `/roles/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedBody,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => ["Role"],
    }),
    deleteRole: builder.mutation<void, IDeleteRoleArgs>({
      query: (ids: any) => ({
        url: `/roles`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => ["Role"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyGetRolesQuery,
  useLazyGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
