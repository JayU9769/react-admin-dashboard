import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRole } from "@/interfaces/role.ts";
import { IUpdateRoleArgs } from "./types.ts";
import {IListAPIResponse, IUpdateAction, TIds} from "@/interfaces";
import { API_BASE_URL } from "@/lib/constants.ts";

// Create API service
export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/roles`,
    credentials: "include",
  }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    getRoles: builder.query<IListAPIResponse, string>({
      query: (query: string = "") => `${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ({ rows }: any) =>
        rows ? rows.map(({ id }: IRole) => ({ type: "Role", id })) : ["Role"],
    }),
    getRoleById: builder.query<IRole, string>({
      query: (id) => `/${id}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, id) => [{ type: "Role", id }],
    }),
    createRole: builder.mutation<IRole, Partial<IRole>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation<IRole, IUpdateRoleArgs>({
      query: ({ id, updatedBody }) => ({
        url: `/${id}`,
        method: "PUT", // Use "PATCH" if you prefer partial updates
        body: updatedBody,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: () => ["Role"],
    }),
    updateRoleAction: builder.mutation<void, IUpdateAction>({
      query: (payload) => ({
        url: `/update-action`,
        method: "POST", // Use "PATCH" if you prefer partial updates
        body: payload,
      }),
      invalidatesTags: () => ["Role"],
    }),
    deleteRole: builder.mutation<void, TIds>({
      query: (ids: TIds) => ({
        url: `/`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: () => ["Role"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetRolesQuery,
  useLazyGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useUpdateRoleActionMutation,
  useDeleteRoleMutation,
} = roleApi;
