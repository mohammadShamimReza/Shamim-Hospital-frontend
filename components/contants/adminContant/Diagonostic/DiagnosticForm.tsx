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
import { Diagnostic, diagnosticSchema } from "@/schemas/diagnosticSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface DiagnosticFormProps {
  onSubmit: (data: Diagnostic) => void;
  onCancel: () => void;
  initialData?: Diagnostic | null;
  isEditing: boolean;
}

export default function DiagnosticForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: DiagnosticFormProps) {
  const methods = useForm<Diagnostic>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: initialData || {
      diagnosticName: "",
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
        <CardTitle>
          {isEditing ? "Edit Diagnostic" : "Add New Diagnostic"}
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
            {/* Diagnostic Name Field */}
            <FormField
              control={control}
              name="diagnosticName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnostic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Diagnostic Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.diagnosticName?.message}</FormMessage>
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
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Diagnostic" : "Add Diagnostic"}
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
