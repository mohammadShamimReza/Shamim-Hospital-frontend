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
import { Pharmacy, pharmacySchema } from "@/schemas/pharmacySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface PharmacyFormProps {
  onSubmit: (data: Pharmacy) => void;
  onCancel: () => void;
  initialData?: Pharmacy | null;
  isEditing: boolean;
}

export default function PharmacyForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: PharmacyFormProps) {
  const methods = useForm<Pharmacy>({
    resolver: zodResolver(pharmacySchema),
    defaultValues: initialData || {
      name: "",
      stockQuantity: 0,
      unitPrice: 0,
      expiryDate: new Date().toISOString().split("T")[0], // Default to today's date
      image: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Pharmacy" : "Add New Pharmacy"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit({
                ...data,
                expiryDate: new Date(data.expiryDate).toISOString(), // Convert to Date object before submission
              });
              reset();
            })}
            className="grid gap-4"
          >
            {/* Name Field */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pharmacy Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Stock Quantity Field */}
            <FormField
              control={control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock Quantity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || "")
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.stockQuantity?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Unit Price Field */}
            <FormField
              control={control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Unit Price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || "")
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.unitPrice?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Expiry Date Field */}
            <FormField
              control={control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>{errors.expiryDate?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Image Field */}
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage>{errors.image?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Pharmacy" : "Add Pharmacy"}
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
