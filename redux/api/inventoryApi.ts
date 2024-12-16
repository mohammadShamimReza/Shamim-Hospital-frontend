import { Inventory } from "@/type/Index";
import { baseApi } from "./baseApi";

const INVENTORY = "/inventory";

const InventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInventory: builder.mutation<void, Partial<Inventory>>({
      query: (body) => ({
        url: `${INVENTORY}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getInventorys"], // Invalidate the list to refetch inventorys
    }),
    getAllInventory: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Inventory[];
      },
      void
    >({
      query: () => ({
        url: `${INVENTORY}/`,
      }),
      providesTags: ["getInventorys"], // Provides tag for refetching when invalidated
    }),
    getInventoryById: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: Inventory;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${INVENTORY}/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Inventory", id }], // Tag specific to inventory ID
    }),
    updateInventory: builder.mutation<
      void,
      { id: number; body: Partial<Inventory> }
    >({
      query: ({ id, body }) => ({
        url: `${INVENTORY}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "getInventorys",
        { type: "Inventory", id },
      ], // Invalidate both the list and the specific inventory entry
    }),
    deleteInventory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${INVENTORY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "getInventorys",
        { type: "Inventory", id },
      ], // Invalidate both the list and the specific inventory entry
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateInventoryMutation,
  useGetAllInventoryQuery,
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = InventoryApi;
