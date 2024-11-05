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
      invalidatesTags: ["createUser"],
    }),
    getAllDoctor: builder.query<
      { statusCode: number; success: boolean; message: string; data: Doctor[] },
      void
    >({
      query: () => ({
        url: `${DOCTOR}/`,
      }),
      providesTags: ["createUser"],
    }),
    getDoctorById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Doctor },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${DOCTOR}/${id}`,
      }),
      providesTags: ["createUser"],
    }),
    updateDoctor: builder.mutation<void, { id: number; body: Partial<Doctor> }>(
      {
        query: ({ id, body }) => ({
          url: `${DOCTOR}/${id}`, // Include the id in the URL
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["createUser"],
      }
    ),
    deleteDoctor: builder.mutation<void, number>({
      query: (id) => ({
        url: `${DOCTOR}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = DoctorApi;
