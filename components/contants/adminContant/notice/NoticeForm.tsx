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
import { Notice, noticeSchema } from "@/schemas/noticeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface NoticeFormProps {
  onSubmit: (data: Notice) => void;
  onCancel: () => void;
  initialData?: Notice | null;
  isEditing: boolean;
}

export default function NoticeForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: NoticeFormProps) {
  const methods = useForm<Notice>({
    resolver: zodResolver(noticeSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      expiryDate: "",
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
        <CardTitle>{isEditing ? "Edit Notice" : "Add New Notice"}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data, "Submitted Notice");
              onSubmit(data);
              reset();
            })}
            className="grid gap-4"
          >
            {/* Title Field */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Notice Title" {...field} />
                  </FormControl>
                  <FormMessage>{errors.title?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Content Field */}
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Notice Content"
                      {...field}
                      className="form-textarea w-full px-3 py-2 border rounded"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage>{errors.content?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>{errors.expiryDate?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Notice" : "Add Notice"}
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
