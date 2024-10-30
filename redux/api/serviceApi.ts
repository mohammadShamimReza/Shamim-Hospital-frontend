import {  Service } from "@/type/Index";
import { baseApi } from "./baseApi";

const SERVICE = "/service";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation<void, Partial<Service>>({
      query: (body) => ({
        url: `${SERVICE}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllService: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Service[];
      },
      void
    >({
      query: () => ({
        url: `${SERVICE}/`,
      }),
      providesTags: ["createUser"],
    }),
    updateService: builder.mutation<void, { id: number; body: Partial<Service> }>(
      {
        query: ({ id, body }) => ({
          url: `${SERVICE}/${id}`, // Include the id in the URL
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["createUser"],
      }
    ),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({
        url: `${SERVICE}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
