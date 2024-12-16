import { Pharmacy } from "@/type/Index";
import { baseApi } from "./baseApi";

const PHARMACY = "/pharmacy";

const PharmacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPharmacy: builder.mutation<void, Partial<Pharmacy>>({
      query: (body) => ({
        url: `${PHARMACY}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getPharmacys"], // Invalidate the list to refetch pharmacys
    }),
    getAllPharmacy: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Pharmacy[];
      },
      void
    >({
      query: () => ({
        url: `${PHARMACY}/`,
      }),
      providesTags: ["getPharmacys"], // Provides tag for refetching when invalidated
    }),
    getPharmacyById: builder.query<
      { statusCode: number; success: boolean; message: string; data: Pharmacy },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${PHARMACY}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Pharmacy", id }], // Tag specific to pharmacy ID
    }),
    updatePharmacy: builder.mutation<
      void,
      { id: number; body: Partial<Pharmacy> }
    >({
      query: ({ id, body }) => ({
        url: `${PHARMACY}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getPharmacys",
        { type: "Pharmacy", id },
      ], // Invalidate both the list and the specific pharmacy entry
    }),
    deletePharmacy: builder.mutation<void, number>({
      query: (id) => ({
        url: `${PHARMACY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getPharmacys",
        { type: "Pharmacy", id },
      ], // Invalidate both the list and the specific pharmacy entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePharmacyMutation,
  useGetAllPharmacyQuery,
  useGetPharmacyByIdQuery,
  useUpdatePharmacyMutation,
  useDeletePharmacyMutation,
} = PharmacyApi;
