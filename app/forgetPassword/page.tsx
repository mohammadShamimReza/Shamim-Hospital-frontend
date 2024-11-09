"use client";
import { Button } from "@/components/ui/button";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ErrorType {
  response: {
    statusCode: number;
    message: string;
    errorMessages: string;
  };
}

function ForgetPassword() {
    const [forgetPassword, { data }] = useForgetPasswordMutation();
    console.log(data)
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: {
      email: "",
      role: "", // default role value
    },
  });

  const { errors } = formState;

  const onSubmit = async (data: { email: string; role: string }) => {
    console.log(data);
    setLoading(true);
    toast.loading("Sending...");
    try {
        const result = await forgetPassword(data);
        console.log(result)
      toast.success("Please check your email");
    } catch (error) {
      console.log(error);
      const specificError = error as ErrorType;
      const logError = specificError?.response;
      toast.error(logError?.errorMessages || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-center text-lg">
        Please enter your email and role
      </div>
      <form className="max-w-md mx-auto my-8" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block mb-2 text-sm font-bold text-gray-600"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full p-2 border rounded-lg ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        <label
          className="block mt-4 mb-2 text-sm font-bold text-gray-600"
          htmlFor="role"
        >
          Role
        </label>
        <Controller
          name="role"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-md p-2">
              <option value="">Select a role</option>
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
              <option value="nurse">Nurse</option>
            </select>
          )}
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default ForgetPassword;
