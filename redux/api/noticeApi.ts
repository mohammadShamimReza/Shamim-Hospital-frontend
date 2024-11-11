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
      invalidatesTags: ["getNotices"], // Invalidate notice list to refetch
    }),
    getAllNotice: builder.query<
      { statusCode: number; success: boolean; message: string; data: Notice[] },
      void
    >({
      query: () => ({
        url: `${NOTICE}/`,
      }),
      providesTags: ["getNotices"], // Provides tag for notice list refetch
    }),
    updateNotice: builder.mutation<void, { id: number; body: Partial<Notice> }>(
      {
        query: ({ id, body }) => ({
          url: `${NOTICE}/${id}`, // Include the id in the URL
          method: "PATCH",
          body,
        }),
        invalidatesTags: (result, error, { id }) => [
          "getNotices",
          { type: "Notice", id },
        ], // Invalidate both list and specific notice entry
      }
    ),
    deleteNotice: builder.mutation<void, number>({
      query: (id) => ({
        url: `${NOTICE}/${id}`, // Specify the ID in the URL
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getNotices",
        { type: "Notice", id },
      ], // Invalidate both list and specific notice entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateNoticeMutation,
  useGetAllNoticeQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = NoticeApi;
