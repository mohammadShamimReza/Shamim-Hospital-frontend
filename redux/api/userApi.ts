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
      providesTags: ["getUsers"], // Provides tag for user list refetch
    }),
    updateUser: builder.mutation<void, { id: number; body: Partial<User> }>({
      query: ({ id, body }) => ({
        url: `${USER}/${id}`, // Include the id in the URL
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getUsers",
        { type: "User", id },
      ], // Invalidate both list and specific user entry
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${USER}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getUsers",
        { type: "User", id },
      ], // Invalidate both list and specific user entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;
