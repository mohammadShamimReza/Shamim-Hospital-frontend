import { Notice } from "@/type/Index";
import { baseApi } from "./baseApi";

const NOTICE = "/notice";

const NoticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotice: builder.mutation<void, Partial<Notice>>({
      query: (body) => ({
        url: `${NOTICE}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["createUser"],
    }),
    getAllNotice: builder.query<
      { statusCode: number; success: boolean; message: string; data: Notice[] },
      void
    >({
      query: () => ({
        url: `${NOTICE}/`,
      }),
      providesTags: ["createUser"],
    }),
    updateNotice: builder.mutation<void, { id: number; body: Partial<Notice> }>(
      {
        query: ({ id, body }) => ({
          url: `${NOTICE}/${id}`, // Include the id in the URL
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["createUser"],
      }
    ),
    deleteNotice: builder.mutation<void, number>({
      query: (id) => ({
        url: `${NOTICE}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateNoticeMutation,
  useGetAllNoticeQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = NoticeApi;
