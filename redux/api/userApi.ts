import { User } from "@/type/Index";
import { baseApi } from "./baseApi";

const USER = "/user";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<void, Partial<User>>({
      query: (body) => ({
        url: `${USER}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
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
  useCreateUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;
