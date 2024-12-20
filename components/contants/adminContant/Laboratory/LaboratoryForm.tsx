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
import { Laboratory, laboratorySchema } from "@/schemas/laboratorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface LaboratoryFormProps {
  onSubmit: (data: Laboratory) => void;
  onCancel: () => void;
  initialData?: Laboratory | null;
  isEditing: boolean;
}

export default function LaboratoryForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: LaboratoryFormProps) {
  const methods = useForm<Laboratory>({
    resolver: zodResolver(laboratorySchema),
    defaultValues: initialData || {
      testName: "",
      price: 0,
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
        <CardTitle>{isEditing ? "Edit Test" : "Add New Test"}</CardTitle>
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
            {/* Test Name Field */}
            <FormField
              control={control}
              name="testName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Test Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.testName?.message}</FormMessage>
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
                      placeholder="Enter Price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Test" : "Add Test"}
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
