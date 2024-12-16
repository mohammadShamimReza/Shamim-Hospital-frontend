"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Inventory, inventorySchema } from "@/schemas/inventorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface InventoryFormProps {
  onSubmit: (data: Inventory) => void;
  onCancel: () => void;
  initialData?: Inventory | null;
  isEditing: boolean;
}

export default function InventoryForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: InventoryFormProps) {
  const methods = useForm<Inventory>({
    resolver: zodResolver(inventorySchema),
    defaultValues: initialData || {
      itemName: "",
      quantity: 0,
      price: 0,
      category: "Medicine", // Set a valid default value from the union type
      purchaseDate: "",
      status: "Available", // Set a valid default value from the union type
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const categories: Inventory["category"][] = [
    "Medicine",
    "Equipment",
    "Consumables",
  ];
  const statuses: Inventory["status"][] = ["Available", "In Use", "Damaged"];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Inventory" : "Add New Inventory"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
            className="grid gap-4"
          >
            {/* Item Name Field */}
            <FormField
              control={control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.itemName?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Quantity Field */}
            <FormField
              control={control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.quantity?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Price Field */}
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="form-select w-full px-3 py-2 border rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.category?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Purchase Date Field */}
            <FormField
              control={control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>{errors.purchaseDate?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Status Field */}
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="form-select w-full px-3 py-2 border rounded"
                    >
                      <option value="">Select Status</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.status?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Inventory" : "Add Inventory"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                  onCancel();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
