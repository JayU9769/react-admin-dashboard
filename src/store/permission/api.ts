import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants.ts";
import {IGetPermissionResponse} from "@/interfaces/permission.ts";

// Create API service
export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/permissions`,
    credentials: "include",
  }),
  tagTypes: ["Permission"],
  endpoints: (builder) => ({
    getPermissions: builder.query<IGetPermissionResponse, string>({
      query: (query: string = "") => `${query}`,
      transformResponse: ({ data }) => data,
      providesTags: ["Permission"],
    })
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyGetPermissionsQuery,
} = permissionApi;
