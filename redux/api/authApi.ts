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
      // transformResponse: (rawResult: UserData | Error) => {
      //   return rawResult;
      // },
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
      // transformResponse: (rawResult: UserData | Error) => {
      //   return rawResult;
      // },
      // transformErrorResponse(baseQueryReturnValue, meta, arg) {
      //   return baseQueryReturnValue.data;
      // },
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `${AUTH}/me`,
      }),
      // transformResponse: (rawResult: UserDataWithDay) => {
      //   return rawResult;
      // },
      // providesTags: ["updateUserDay", "updateUser"],
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH}/forgot-password`,
        method: "POST",
        body,
      }),

      // invalidatesTags: [tagTypes.user],
    }),
    resetPassword: builder.mutation({
      query: (newPassword) => ({
        url: `${AUTH}/reset-password`,
        method: "POST",
        data: newPassword,
      }),

      // invalidatesTags: [tagTypes.user],
    }),
  }),
});


export const {useLoginUserMutation, useGetUserInfoQuery, useCreateUserMutation, useForgetPasswordMutation, useResetPasswordMutation} = authApi;