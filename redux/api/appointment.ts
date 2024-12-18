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
      invalidatesTags: ["getAppointments"], // Invalidate the appointments list
    }),
    getAllAppointment: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Appointment[];
      },
      void
    >({
      query: () => ({
        url: `${APPOINTMENT}/`,
      }),
      providesTags: ["getAppointments"], // Provide the appointments list tag
    }),
    getAllAppointmentByUser: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Appointment[];
      },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${APPOINTMENT}/user/${id}`,
      }),
      providesTags: ["getAppointments"], // Provide the appointments list tag
    }),
    updateAppointment: builder.mutation<
      void,
      { id: number; body: Partial<Appointment> }
    >({
      query: ({ id, body }) => ({
        url: `${APPOINTMENT}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["getAppointments"], // Invalidate the appointments list
    }),
    deleteAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `${APPOINTMENT}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
      invalidatesTags: ["getAppointments"], // Invalidate the appointments list
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllAppointmentByUserQuery,
} = AppointmentApi;
