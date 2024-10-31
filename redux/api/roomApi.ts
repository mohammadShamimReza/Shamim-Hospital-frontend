import { Room } from "@/type/Index";
import { baseApi } from "./baseApi";

const ROOM = "/room";

const RoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<void, Partial<Room>>({
      query: (body) => ({
        url: `${ROOM}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllRoom: builder.query<
      { statusCode: number; success: boolean; message: string; data: Room[] },
      void
    >({
      query: () => ({
        url: `${ROOM}/`,
      }),
      providesTags: ["createUser"],
    }),
    updateRoom: builder.mutation<void, { id: number; body: Partial<Room> }>(
      {
        query: ({ id, body }) => ({
          url: `${ROOM}/${id}`, // Include the id in the URL
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["createUser"],
      }
    ),
    deleteRoom: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ROOM}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = RoomApi;
