import { baseApi } from "./baseApi"

const NURSE = "/nurse"

const nurseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNurse: builder.mutation({
      query: (body) => ({
        url: `${NURSE}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllNurse: builder.query({
      query: () => ({
        url: `${NURSE}/`
      }),
      providesTags: ["createUser"],
    }),
  }),
});


export const {useCreateNurseMutation, useGetAllNurseQuery} = nurseApi