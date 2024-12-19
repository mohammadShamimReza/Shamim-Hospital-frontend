"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Image from "next/image";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useUpdateStaffMutation } from "@/redux/api/staffApi";

// Define schema with Zod
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.preprocess(
    (value) => Number(value),
    z.number().min(1000000000, "Invalid phone number")
  ), // Ensure phone is converted to a number
  address: z.string().min(1, "Address is required"),
  role: z.string(),
});

const UserProfile = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [profile_image, setProfileImage] = useState<string | null>(
    userInfo.profile_image || null
  );
  const [isUploading, setIsUploading] = useState(false);

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
  const [updateStaff] = useUpdateStaffMutation();

  const onSubmit = async (user: User) => {
    try {
      const result = await updateStaff({
        id: Number(userInfo.id),
        body: user,
      });
      console.log("User Updated:", result);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }

    setIsEditing(false);
  };

  const handleImageUploadClick = () => {
    // Programmatically trigger the file input click
    const input = document.getElementById("profile-upload") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsUploading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    // Uncomment and replace with your upload logic
    // try {
    //   const response = await axios.post(
    //     "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
    //     formData
    //   );

    //   const imageUrl = response.data.secure_url;
    //   setProfileImage(imageUrl);
    //   toast.success("Image uploaded successfully!");
    // } catch (error) {
    //   console.error("Image upload failed:", error);
    //   toast.error("Failed to upload image. Please try again.");
    // } finally {
    //   setIsUploading(false);
    // }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <Card className="mb-8">
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

                {/* Image Upload */}
                <div className="space-y-4">
                  <FormLabel>Profile Picture</FormLabel>
                  <div className="flex flex-col items-center gap-4">
                    {profile_image ? (
                      <Image
                        src={profile_image}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <Button
                      type="button" // Prevent the button from triggering form submission
                      variant="outline"
                      disabled={isUploading}
                      onClick={handleImageUploadClick}
                    >
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </FormProvider>
          ) : (
            <div className="grid gap-4">
              <div className="flex flex-col items-center gap-4">
                {profile_image ? (
                  <Image
                    src={profile_image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
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
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsEditing(!isEditing)} variant="secondary">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
