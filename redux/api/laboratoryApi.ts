import { Laboratory } from "@/type/Index";
import { baseApi } from "./baseApi";

const LABORATORY = "/laboratory";

const LaboratoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLaboratory: builder.mutation<void, Partial<Laboratory>>({
      query: (body) => ({
        url: `${LABORATORY}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getLaboratorys"], // Invalidate the list to refetch laboratorys
    }),
    getAllLaboratory: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Laboratory[];
      },
      void
    >({
      query: () => ({
        url: `${LABORATORY}/`,
      }),
      providesTags: ["getLaboratorys"], // Provides tag for refetching when invalidated
    }),
    getLaboratoryById: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Laboratory;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${LABORATORY}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Laboratory", id }], // Tag specific to laboratory ID
    }),
    updateLaboratory: builder.mutation<
      void,
      { id: number; body: Partial<Laboratory> }
    >({
      query: ({ id, body }) => ({
        url: `${LABORATORY}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getLaboratorys",
        { type: "Laboratory", id },
      ], // Invalidate both the list and the specific laboratory entry
    }),
    deleteLaboratory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${LABORATORY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getLaboratorys",
        { type: "Laboratory", id },
      ], // Invalidate both the list and the specific laboratory entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLaboratoryMutation,
  useGetAllLaboratoryQuery,
  useGetLaboratoryByIdQuery,
  useUpdateLaboratoryMutation,
  useDeleteLaboratoryMutation,
} = LaboratoryApi;
