import { Nurse } from "@/type/Index";
import { baseApi } from "./baseApi";

const NURSE = "/nurse";

const nurseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNurse: builder.mutation<void, Partial<Nurse>>({
      query: (body) => ({
        url: `${NURSE}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllNurse: builder.query<
      { statusCode: number; success: boolean; message: string; data: Nurse[] },
      void
    >({
      query: () => ({
        url: `${NURSE}/`,
      }),
      providesTags: ["createUser"],
    }),
  }),
});

export const { useCreateNurseMutation, useGetAllNurseQuery } = nurseApi;
