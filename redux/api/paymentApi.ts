import { baseApi } from "./baseApi";

const PAYMENT = "/payment";
export const paymentAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentInit: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT}/init`,
        method: "POST",
        body: body,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformResponse: (rawResult: { url: string; response: any }) => {
          return rawResult;
        },
      }),
    }),
  }),
});

export const { usePaymentInitMutation } = paymentAPi;
