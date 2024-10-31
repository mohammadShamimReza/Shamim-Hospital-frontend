import { Admin } from "@/type/Index";
import { baseApi } from "./baseApi";

const ADMIN = "/admin";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query<
      { statusCode: number; success: boolean; message: string; data: Admin[] },
      void
    >({
      query: () => ({
        url: `${ADMIN}/`,
      }),
      // providesTags: ["createAdmin"],
    }),
    updateAdmin: builder.mutation<void, { id: number; body: Partial<Admin> }>({
      query: ({ id, body }) => ({
        url: `${ADMIN}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      // invalidatesTags: ["createAdmin"],
    }),
    deleteAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ADMIN}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = AdminApi;
