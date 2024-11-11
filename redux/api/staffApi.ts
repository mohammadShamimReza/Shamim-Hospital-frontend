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
      invalidatesTags: ["getStaff"], // Invalidate staff list to refetch
    }),
    getAllStaff: builder.query<
      { statusCode: number; success: boolean; message: string; data: Staff[] },
      void
    >({
      query: () => ({
        url: `${STAFF}/`,
      }),
      providesTags: ["getStaff"], // Provides tag for staff list refetch
    }),
    getStaffById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Staff },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${STAFF}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Staff", id }], // Tag specific to staff ID
    }),
    updateStaff: builder.mutation<void, { id: number; body: Partial<Staff> }>({
      query: ({ id, body }) => ({
        url: `${STAFF}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getStaff",
        { type: "Staff", id },
      ], // Invalidate both list and specific staff entry
    }),
    deleteStaff: builder.mutation<void, number>({
      query: (id) => ({
        url: `${STAFF}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getStaff",
        { type: "Staff", id },
      ], // Invalidate both list and specific staff entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateStaffMutation,
  useGetAllStaffQuery,
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = StaffApi;
