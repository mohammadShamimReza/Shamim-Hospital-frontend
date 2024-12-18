import { PharmacyAppointment } from "@/type/Index";
import { baseApi } from "./baseApi";

const PHARMACY = "/pharmacyAppointment";

const PharmacyAppointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPharmacyAppointment: builder.mutation<
      void,
      Partial<PharmacyAppointment>
    >({
      query: (body) => ({
        url: `${PHARMACY}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getPharmacyAppointments"], // Invalidate the list to refetch pharmacys
    }),
    getAllPharmacyAppointment: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: PharmacyAppointment[];
      },
      void
    >({
      query: () => ({
        url: `${PHARMACY}/`,
      }),
      providesTags: ["getPharmacyAppointments"], // Provides tag for refetching when invalidated
    }),
    getPharmacyAppointmentById: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: PharmacyAppointment;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${PHARMACY}/${id}`,
      }),
      providesTags: (result, error, { id }) => [
        { type: "PharmacyAppointment", id },
      ], // Tag specific to pharmacy ID
    }),
    updatePharmacyAppointment: builder.mutation<
      void,
      { id: number; body: Partial<PharmacyAppointment> }
    >({
      query: ({ id, body }) => ({
        url: `${PHARMACY}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getPharmacyAppointments",
        { type: "PharmacyAppointment", id },
      ], // Invalidate both the list and the specific pharmacy entry
    }),
    deletePharmacyAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `${PHARMACY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getPharmacyAppointments",
        { type: "PharmacyAppointment", id },
      ], // Invalidate both the list and the specific pharmacy entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePharmacyAppointmentMutation,
  useGetAllPharmacyAppointmentQuery,
  useGetPharmacyAppointmentByIdQuery,
  useUpdatePharmacyAppointmentMutation,
  useDeletePharmacyAppointmentMutation,
} = PharmacyAppointmentApi;
