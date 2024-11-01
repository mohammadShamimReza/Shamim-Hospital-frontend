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
    getNurseById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Nurse },
      {id: number}
    >({
      query: ({id}) => ({
        url: `${NURSE}/${id}`,
      }),
      providesTags: ["createUser"],
    }),

    updateNurse: builder.mutation<void, { id: number; body: Partial<Nurse> }>({
      query: ({ id, body }) => ({
        url: `${NURSE}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    deleteNurse: builder.mutation<void, number>({
      query: (id) => ({
        url: `${NURSE}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateNurseMutation, useGetAllNurseQuery, useGetNurseByIdQuery, useUpdateNurseMutation, useDeleteNurseMutation } = nurseApi;
