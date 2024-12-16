import { Doctor } from "@/type/Index";
import { baseApi } from "./baseApi";

const DOCTOR = "/doctor";

const DoctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation<void, Partial<Doctor>>({
      query: (body) => ({
        url: `${DOCTOR}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getDoctors"], // Invalidate the list to refetch doctors
    }),
    getAllDoctor: builder.query<
      { statusCode: number; success: boolean; message: string; data: Doctor[] },
      void
    >({
      query: () => ({
        url: `${DOCTOR}/`,
      }),
      providesTags: ["getDoctors"], // Provides tag for refetching when invalidated
    }),
    getDoctorById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Doctor },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${DOCTOR}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Doctor", id }], // Tag specific to doctor ID
    }),
    updateDoctor: builder.mutation<void, { id: number; body: Partial<Doctor> }>(
      {
        query: ({ id, body }) => ({
          url: `${DOCTOR}/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (result, error, { id }) => [
          "getDoctors",
          { type: "Doctor", id },
        ], // Invalidate both the list and the specific doctor entry
      }
    ),
    deleteDoctor: builder.mutation<void, number>({
      query: (id) => ({
        url: `${DOCTOR}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getDoctors",
        { type: "Doctor", id },
      ], // Invalidate both the list and the specific doctor entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = DoctorApi;
