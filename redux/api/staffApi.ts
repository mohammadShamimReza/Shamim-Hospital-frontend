import { Staff } from "@/type/Index";
import { baseApi } from "./baseApi";

const STAFF = "/staff";

const StaffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaff: builder.mutation<void, Partial<Staff>>({
      query: (body) => ({
        url: `${STAFF}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllStaff: builder.query<
      { statusCode: number; success: boolean; message: string; data: Staff[] },
      void
    >({
      query: () => ({
        url: `${STAFF}/`,
      }),
      providesTags: ["createUser"],
    }),
    getStaffById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Staff },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${STAFF}/${id}`,
      }),
      providesTags: ["createUser"],
    }),
    updateStaff: builder.mutation<void, { id: number; body: Partial<Staff> }>({
      query: ({ id, body }) => ({
        url: `${STAFF}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    deleteStaff: builder.mutation<void, number>({
      query: (id) => ({
        url: `${STAFF}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStaffMutation,
  useGetAllStaffQuery,
  useGetStaffByIdQuery,

  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = StaffApi;
