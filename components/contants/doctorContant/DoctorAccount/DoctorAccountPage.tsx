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
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import {
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { toast } from "sonner";

// Define schema with Zod
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.number().min(10, "Phone number should be at least 10 characters"),
  address: z.string().min(1, "Address is required"),
  role: z.string(),
});

const DoctorAccountPage = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [isEditing, setIsEditing] = useState(false);

  console.log(userInfo);

  const { data: appointments } = useGetDoctorByIdQuery({
    id: Number(userInfo.id),
  });
  console.log(appointments, "this is appointments");

  const getTotalCompletedPrice = () => {
    if (!appointments?.data?.appointments) return 0;

    return appointments.data.appointments
      .filter((appointment) => appointment.status === "completed")
      .reduce((sum, appointment) => sum + (appointment.price || 0), 0);
  };

  const getCompletedAppointmentCount = () => {
    if (!appointments?.data?.appointments) return 0;

    return appointments.data.appointments.filter(
      (appointment) => appointment.status === "completed"
    ).length;
  };

  const totalCompletedPrice = getTotalCompletedPrice();
  const completedAppointmentCount = getCompletedAppointmentCount();

  console.log(totalCompletedPrice, completedAppointmentCount);

  // Initialize react-hook-form with default values from Redux state
  const methods = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      role: userInfo.role,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

  if (updating) {
    toast("updating", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }

  const onSubmit = async (user: User) => {
    console.log(user, user.id);
    console.log("Updated User Data:", user);
    try {
      const result = await updateDoctor({
        id: Number(userInfo.id),
        body: user,
      });
      console.log("userd Updated:", result);
    } catch (error) {
      console.log(error);
    }

    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <Card className="mb-8 ">
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit User Profile" : "User Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                {/* Name Field */}
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
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
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
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
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          {...field}
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
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage>{errors.address?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Role Field (Read-only) */}
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
                          value={userInfo.role}
                          disabled
                        />
                      </FormControl>
                      <FormMessage>{errors.role?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </FormProvider>
          ) : (
            <div className="grid gap-4">
              <div>
                <strong>Name:</strong> {userInfo.name}
              </div>
              <div>
                <strong>Email:</strong> {userInfo.email}
              </div>
              <div>
                <strong>Phone:</strong> {userInfo.phone}
              </div>
              <div>
                <strong>Address:</strong> {userInfo.address}
              </div>
              <div>
                <strong>Role:</strong> {userInfo.role}
              </div>
            </div>
          )}
          <br />
          <Button onClick={() => setIsEditing(!isEditing)} variant="secondary">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h3 className="text-md flex">
          Total Price of Completed Appointments:{" "}
          <p className="font-semibold">$ {totalCompletedPrice}</p>
        </h3>
        <h3 className="text-md flex">
          Total Completed Appointments:
          <p className="font-semibold"> {completedAppointmentCount}</p>
        </h3>
      </div>
    </div>
  );
};

export default DoctorAccountPage;
