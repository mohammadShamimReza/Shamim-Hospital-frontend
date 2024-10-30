import { User } from "@/type/Index";
import { baseApi } from "./baseApi";

const USER = "/user";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<
      { statusCode: number; success: boolean; message: string; data: User[] },
      void
    >({
      query: () => ({
        url: `${USER}/`,
      }),
      providesTags: ["createUser"],
    }),
    updateUser: builder.mutation<void, { id: number; body: Partial<User> }>({
      query: ({ id, body }) => ({
        url: `${USER}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${USER}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;
