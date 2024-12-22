"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { decodedToken } from "@/lib/auth/jwt";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ErrorType {
  response: {
    statusCode: number;
    message: string;
    errorMessages: string;
  };
}
interface UserInfo {
  id: string;
  role: string;
}

function ResetPass() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const token = searchParams.get("token");
  const userInfo = decodedToken(token as string) as UserInfo;
  const { id, role } = userInfo;

  const [resetPassword] = useResetPasswordMutation();
  const { register, handleSubmit, formState, watch, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      id: id,
      role: role,
      token: token || "",
    },
  });

  const { errors } = formState;
  const password = watch("password");
  const newPassword = watch("newPassword");

  if (!token) {
    toast.error("Invalid token");
    router.push("/login");
    return null;
  }

  const onSubmit = async (data: {
    password: string;
    newPassword: string;
    id: string;
    role: string;
    token: string;
  }) => {
    data.id = id;
    data.role = role;
    data.token = token || "";
    setLoading(true);
    try {
      if (password !== newPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const result = await resetPassword({ ...data }).unwrap();
      console.log(result);
      if (result?.error) {
        toast("Something went wrong", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        toast(
          "Account recovered successfully! Please login with your new password."
        );
      }
      reset({ newPassword: "", password: "" });
      router.push("/login");
      toast.success("Password reset successfully!");
    } catch (error) {
      const specificError = error as ErrorType;
      const logError = specificError?.response;
      toast.error(logError?.errorMessages || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <form className="max-w-md mx-auto my-8" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block mb-2 text-sm font-bold text-gray-600 rounded-lg"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            className={`w-full p-2 border rounded-lg ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                message:
                  "Password must contain a letter, a number, and a special character",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}

        <label
          className="block mb-2 text-sm font-bold text-gray-600 rounded-lg"
          htmlFor="newPassword"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            className={`w-full p-2 border rounded-lg ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            {...register("newPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            {showNewPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPassPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <ResetPass />
    </Suspense>
  );
}
