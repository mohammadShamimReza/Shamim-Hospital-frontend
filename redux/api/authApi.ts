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
  }),
});


export const {useLoginUserMutation, useGetUserInfoQuery} = authApi;