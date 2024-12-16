import { Diagnostic } from "@/type/Index";
import { baseApi } from "./baseApi";

const DIAGONOSTIC = "/diagonostic";

const DiagnosticApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDiagnostic: builder.mutation<void, Partial<Diagnostic>>({
      query: (body) => ({
        url: `${DIAGONOSTIC}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getDiagnostics"], // Invalidate the list to refetch diagonostics
    }),
    getAllDiagnostic: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Diagnostic[];
      },
      void
    >({
      query: () => ({
        url: `${DIAGONOSTIC}/`,
      }),
      providesTags: ["getDiagnostics"], // Provides tag for refetching when invalidated
    }),
    getDiagnosticById: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Diagnostic;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${DIAGONOSTIC}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Diagnostic", id }], // Tag specific to diagonostic ID
    }),
    updateDiagnostic: builder.mutation<
      void,
      { id: number; body: Partial<Diagnostic> }
    >({
      query: ({ id, body }) => ({
        url: `${DIAGONOSTIC}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getDiagnostics",
        { type: "Diagnostic", id },
      ], // Invalidate both the list and the specific diagonostic entry
    }),
    deleteDiagnostic: builder.mutation<void, number>({
      query: (id) => ({
        url: `${DIAGONOSTIC}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getDiagnostics",
        { type: "Diagnostic", id },
      ], // Invalidate both the list and the specific diagonostic entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateDiagnosticMutation,
  useGetAllDiagnosticQuery,
  useGetDiagnosticByIdQuery,
  useUpdateDiagnosticMutation,
  useDeleteDiagnosticMutation,
} = DiagnosticApi;
