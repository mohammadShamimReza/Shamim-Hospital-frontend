"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Staff, staffSchema } from "@/schemas/staffSchema";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface StaffFormProps {
  isEditing: boolean;
  initialData?: Staff;
  onSave: (staff: Staff) => void;
  onCancel: () => void;
}

export default function StaffForm({
  isEditing,
  initialData,
  onSave,
  onCancel,
}: StaffFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const methods = useForm<Staff>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: 0,
      address: "",
      role: "staff",
      ...initialData, // Set default values based on initial data
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (initialData) {
      reset(initialData); // Reset form values if initialData changes
    }
  }, [initialData, reset]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Staff" : "Add New Staff"}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSave(data);
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
                    <Input placeholder="Name" {...field} />
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

            {/* Password Field with Toggle Visibility */}
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

            {/* Role Field (Disabled for Staff) */}
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
                      value="staff"
                      disabled
                    />
                  </FormControl>
                  <FormMessage>{errors.role?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Staff" : "Add Staff"}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
