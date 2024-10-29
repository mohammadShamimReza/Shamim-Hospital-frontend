"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doctor, doctorSchema } from "@/schemas/doctorSchema";

interface DoctorFormProps {
  onSubmit: (data: Doctor) => void;
  onCancel: () => void;
  initialData?: Doctor;
  isEditing: boolean;
}

export default function DoctorForm({
  onSubmit,
  onCancel,
  initialData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    designation: "",
    passingYear: "",
    workplace: "",
    serviceId: undefined,
  },
  isEditing,
}: DoctorFormProps) {
  const methods = useForm<Doctor>({
    resolver: zodResolver(doctorSchema),
    defaultValues: initialData,
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
        <CardTitle>{isEditing ? "Edit Doctor" : "Add New Doctor"}</CardTitle>
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
            {/* Name Field */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doctor's Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Role Field */}
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Role" {...field} />
                  </FormControl>
                  <FormMessage>{errors.role?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Designation Field */}
            <FormField
              control={control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Designation" {...field} />
                  </FormControl>
                  <FormMessage>{errors.designation?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Passing Year Field */}
            <FormField
              control={control}
              name="passingYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passing Year</FormLabel>
                  <FormControl>
                    <Input placeholder="Passing Year" {...field} />
                  </FormControl>
                  <FormMessage>{errors.passingYear?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Workplace Field */}
            <FormField
              control={control}
              name="workplace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workplace / Institute</FormLabel>
                  <FormControl>
                    <Input placeholder="Workplace / Institute" {...field} />
                  </FormControl>
                  <FormMessage>{errors.workplace?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Service ID Field */}
            <FormField
              control={control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Service ID"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || "")
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.serviceId?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Doctor" : "Add Doctor"}
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
