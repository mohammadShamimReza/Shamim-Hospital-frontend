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
      providesTags: ["getAdmins"], // Cache and provide 'getAdmins' tag
    }),
    updateAdmin: builder.mutation<void, { id: number; body: Partial<Admin> }>({
      query: ({ id, body }) => ({
        url: `${ADMIN}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["getAdmins", "updateAdmin"], // Invalidate 'getAdmins' and 'updateAdmin' tags
    }),
    deleteAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ADMIN}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
      invalidatesTags: ["getAdmins", "deleteAdmin"], // Invalidate 'getAdmins' and 'deleteAdmin' tags
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = AdminApi;
