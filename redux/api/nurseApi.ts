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
      invalidatesTags: ["getNurses"], // Invalidate nurse list to refetch
    }),
    getAllNurse: builder.query<
      { statusCode: number; success: boolean; message: string; data: Nurse[] },
      void
    >({
      query: () => ({
        url: `${NURSE}/`,
      }),
      providesTags: ["getNurses"], // Provides tag for nurse list refetch
    }),
    getNurseById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Nurse },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${NURSE}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Nurse", id }], // Tag specific to nurse ID
    }),

    updateNurse: builder.mutation<void, { id: number; body: Partial<Nurse> }>({
      query: ({ id, body }) => ({
        url: `${NURSE}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getNurses",
        { type: "Nurse", id },
      ], // Invalidate both list and specific nurse entry
    }),
    deleteNurse: builder.mutation<void, number>({
      query: (id) => ({
        url: `${NURSE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getNurses",
        { type: "Nurse", id },
      ], // Invalidate both list and specific nurse entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateNurseMutation,
  useGetAllNurseQuery,
  useGetNurseByIdQuery,
  useUpdateNurseMutation,
  useDeleteNurseMutation,
} = nurseApi;
