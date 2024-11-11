import { baseApi } from "./baseApi";

const AUTH = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: `${AUTH}/login`,
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `${AUTH}/signup`,
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `${AUTH}/me`,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH}/forgot-password`,
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    resetPassword: builder.mutation({
      query: (newPassword) => ({
        url: `${AUTH}/reset-password`,
        method: "POST",
        body: newPassword, // Changed `data` to `body` for consistency
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
