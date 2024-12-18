import { LaboratoryAppointment } from "@/type/Index";
import { baseApi } from "./baseApi";

const LABORATORY = "/laboratoryAppointment";

const LaboratoryAppointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLaboratoryAppointment: builder.mutation<
      void,
      Partial<LaboratoryAppointment>
    >({
      query: (body) => ({
        url: `${LABORATORY}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getLaboratoryAppointments"], // Invalidate the list to refetch laboratorys
    }),
    getAllLaboratoryAppointment: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: LaboratoryAppointment[];
      },
      void
    >({
      query: () => ({
        url: `${LABORATORY}/`,
      }),
      providesTags: ["getLaboratoryAppointments"], // Provides tag for refetching when invalidated
    }),
    getLaboratoryAppointmentById: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: LaboratoryAppointment;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${LABORATORY}/${id}`,
      }),
      providesTags: (result, error, { id }) => [
        { type: "LaboratoryAppointment", id },
      ], // Tag specific to laboratory ID
    }),
    updateLaboratoryAppointment: builder.mutation<
      void,
      { id: number; body: Partial<LaboratoryAppointment> }
    >({
      query: ({ id, body }) => ({
        url: `${LABORATORY}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getLaboratoryAppointments",
        { type: "LaboratoryAppointment", id },
      ], // Invalidate both the list and the specific laboratory entry
    }),
    deleteLaboratoryAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `${LABORATORY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getLaboratoryAppointments",
        { type: "LaboratoryAppointment", id },
      ], // Invalidate both the list and the specific laboratory entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLaboratoryAppointmentMutation,
  useGetAllLaboratoryAppointmentQuery,
  useGetLaboratoryAppointmentByIdQuery,
  useUpdateLaboratoryAppointmentMutation,
  useDeleteLaboratoryAppointmentMutation,
} = LaboratoryAppointmentApi;
