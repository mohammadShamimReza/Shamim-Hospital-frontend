"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
 
      "http://localhost:4000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.authToken || getTokenFromCookie();
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['createUser'],
});
