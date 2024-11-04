import { Appointment } from "@/type/Index";
import { baseApi } from "./baseApi";

const APPOINTMENT = "/appointment";

const AppointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation<void, Partial<Appointment>>({
      query: (body) => ({
        url: `${APPOINTMENT}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllAppointment: builder.query<
      { statusCode: number; success: boolean; message: string; data: Appointment[] },
      void
    >({
      query: () => ({
        url: `${APPOINTMENT}/`,
      }),
      providesTags: ["createUser"],
    }),
    updateAppointment: builder.mutation<void, { id: number; body: Partial<Appointment> }>(
      {
        query: ({ id, body }) => ({
          url: `${APPOINTMENT}/${id}`, // Include the id in the URL
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["createUser"],
      }
    ),
    deleteAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `${APPOINTMENT}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = AppointmentApi;
