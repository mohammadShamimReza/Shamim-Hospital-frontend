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
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { Doctor, doctorSchema } from "@/schemas/doctorSchema";
import { Service } from "@/type/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface DoctorFormProps {
  onSubmit: (data: Doctor) => void;
  onCancel: () => void;
  initialData?: Doctor | null;
  isEditing: boolean;
}

export default function DoctorForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: DoctorFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const methods = useForm<Doctor>({
    resolver: zodResolver(doctorSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      phone: 0,
      address: "",
      role: "doctor",
      designation: "",
      passingYear: "",
      serviceId: 0,
    },
  });

  const { data: allServices } = useGetAllServiceQuery();
  console.log(allServices);

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

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="name123$#"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-2 flex items-center"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
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
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || "")
                      }
                    />
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
                    <Input
                      placeholder="Role"
                      {...field}
                      value={"doctor"}
                      disabled
                    />
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
                    <Input placeholder="MBBS, FCPS" {...field} />
                  </FormControl>
                  <FormMessage>{errors.designation?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))} // Ensure it's a number
                      className="form-select w-full px-3 py-2 border rounded"
                    >
                      <option value="">Select Service</option>
                      {allServices?.data?.map((service: Service) => (
                        <option key={service.id} value={service.id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.serviceId?.message}</FormMessage>
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
                    <select
                      {...field}
                      className="form-select w-full px-3 py-2 border rounded" // Add styling as needed
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 50 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.passingYear?.message}</FormMessage>
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
