import { DiagnosticAppointment } from "@/type/Index";
import { baseApi } from "./baseApi";

const DIAGONOSTIC = "/diagonosticAppointment";

const DiagnosticAppointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDiagnosticAppointment: builder.mutation<
      void,
      Partial<DiagnosticAppointment>
    >({
      query: (body) => ({
        url: `${DIAGONOSTIC}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getDiagnosticAppointments"], // Invalidate the list to refetch diagonostics
    }),
    getAllDiagnosticAppointment: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: DiagnosticAppointment[];
      },
      void
    >({
      query: () => ({
        url: `${DIAGONOSTIC}/`,
      }),
      providesTags: ["getDiagnosticAppointments"], // Provides tag for refetching when invalidated
    }),
    getDiagnosticAppointmentById: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: DiagnosticAppointment;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${DIAGONOSTIC}/${id}`,
      }),
      providesTags: (result, error, { id }) => [
        { type: "DiagnosticAppointment", id },
      ], // Tag specific to diagonostic ID
    }),
    updateDiagnosticAppointment: builder.mutation<
      void,
      { id: number; body: Partial<DiagnosticAppointment> }
    >({
      query: ({ id, body }) => ({
        url: `${DIAGONOSTIC}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getDiagnosticAppointments",
        { type: "DiagnosticAppointment", id },
      ], // Invalidate both the list and the specific diagonostic entry
    }),
    deleteDiagnosticAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `${DIAGONOSTIC}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getDiagnosticAppointments",
        { type: "DiagnosticAppointment", id },
      ], // Invalidate both the list and the specific diagonostic entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateDiagnosticAppointmentMutation,
  useGetAllDiagnosticAppointmentQuery,
  useGetDiagnosticAppointmentByIdQuery,
  useUpdateDiagnosticAppointmentMutation,
  useDeleteDiagnosticAppointmentMutation,
} = DiagnosticAppointmentApi;
