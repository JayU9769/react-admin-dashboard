import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants.ts";
import {IGetPermissionResponse} from "@/interfaces/permission.ts";
import {EAPITags} from "@/interfaces";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: [EAPITags.DROPDOWN_OPTIONS],
  endpoints: (builder) => ({
    getDropdownOptions: builder.query<IGetPermissionResponse, string>({
      query: (type: string = "") => `?q=${type}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, type) => [{ type: EAPITags.DROPDOWN_OPTIONS, id: type }],
    }),
  }),
});

export const {
  useGetDropdownOptionsQuery
} = rootApi;
