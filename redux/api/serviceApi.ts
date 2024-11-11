import { Service } from "@/type/Index";
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
      invalidatesTags: ["getServices"], // Invalidate the service list to refetch
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
      providesTags: ["getServices"], // Provides tag for service list refetch
    }),
    updateService: builder.mutation<
      void,
      { id: number; body: Partial<Service> }
    >({
      query: ({ id, body }) => ({
        url: `${SERVICE}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getServices",
        { type: "Service", id },
      ], // Invalidate both list and specific service entry
    }),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({
        url: `${SERVICE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getServices",
        { type: "Service", id },
      ], // Invalidate both list and specific service entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
