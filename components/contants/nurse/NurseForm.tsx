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
import { Nurse, nurseSchema } from "@/schemas/nurseSchema";

interface NurseFormProps {
  isEditing: boolean;
  initialData?: Nurse;
  onSave: (nurse: Nurse) => void;
  onCancel: () => void;
}

export default function NurseForm({
  isEditing,
  initialData,
  onSave,
  onCancel,
}: NurseFormProps) {
  const methods = useForm<Nurse>({
    resolver: zodResolver(nurseSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      shift: "",
      employmentDate: "",
      profile_image: "",
      roomId: undefined,
      role: "",
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
        <CardTitle>{isEditing ? "Edit Nurse" : "Add New Nurse"}</CardTitle>
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

            {/* Department Field */}
            <FormField
              control={control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Department" {...field} />
                  </FormControl>
                  <FormMessage>{errors.department?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Shift Field */}
            <FormField
              control={control}
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shift</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Shift Timing (e.g., Night)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.shift?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Employment Date Field */}
            <FormField
              control={control}
              name="employmentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Employment Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.employmentDate?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Profile Image Field */}
            <FormField
              control={control}
              name="profile_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Profile Image URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.profile_image?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Room ID Field */}
            <FormField
              control={control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Room ID" {...field} />
                  </FormControl>
                  <FormMessage>{errors.roomId?.message}</FormMessage>
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

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Nurse" : "Add Nurse"}
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
