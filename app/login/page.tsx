"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigation } from "@/contexts/NavigatoinContext";
import { storeTokenInCookie } from "@/lib/auth/token";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import loginImage from "../Assets/login/login.webp";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain a letter, a number, and a special character"
    ),
  role: z.enum(["admin", "doctor", "patient", "nurse", "staff"]),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { setSelectedMenu } = useNavigation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false); // Local loading state

  const formMethods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", role: "patient" },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    if (data.email !== "" && data.password !== "") {
      try {
        setLoading(true);
        const result = await loginUser(data);
        console.log(result, "this is login result");

        if (result?.error) {
          toast("User is not valid, please give the valid crediantials", {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else {
          toast("Login successfully");

          storeTokenInCookie(result?.data?.data.accessToken);
          dispatch(storeAuthToken(result?.data?.data.accessToken));
          localStorage.setItem("jwt", result?.data?.data.accessToken);

          dispatch(storeUserInfo(result?.data?.user));
          setSelectedMenu("Overview");

          router.push("/");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      toast("Invalid email or password.");
    }
  };

  const autoLogin = async (role: string) => {
    if (role === "admin") {
      const result = await loginUser({
        email: "admin@gmail.com",
        password: "admin123$#",
        role: "admin",
      });
      toast("Login successfully");

      storeTokenInCookie(result?.data?.data.accessToken);
      dispatch(storeAuthToken(result?.data?.data.accessToken));
      localStorage.setItem("jwt", result?.data?.data.accessToken);

      dispatch(storeUserInfo(result?.data?.user));
      setSelectedMenu("Overview");

      router.push("/");
      window.location.reload();
      console.log(result);
    } else if (role === "doctor") {
      const result = await loginUser({
        email: "doctor@gmail.com",
        password: "doctor123$#",
        role: "doctor",
      });
      console.log(result);
      toast("Login successfully");

      storeTokenInCookie(result?.data?.data.accessToken);
      dispatch(storeAuthToken(result?.data?.data.accessToken));
      localStorage.setItem("jwt", result?.data?.data.accessToken);

      dispatch(storeUserInfo(result?.data?.user));
      setSelectedMenu("Overview");

      router.push("/");
      window.location.reload();
    } else if (role === "patient") {
      const result = await loginUser({
        email: "user@gmail.com",
        password: "user123$#",
        role: "patient",
      });
      toast("Login successfully");

      storeTokenInCookie(result?.data?.data.accessToken);
      dispatch(storeAuthToken(result?.data?.data.accessToken));
      localStorage.setItem("jwt", result?.data?.data.accessToken);

      dispatch(storeUserInfo(result?.data?.user));
      setSelectedMenu("Overview");

      router.push("/");
      window.location.reload();
    } else if (role === "staff") {
      const result = await loginUser({
        email: "staff@gmail.com",
        password: "staff123$#",
        role: "staff",
      });
      toast("Login successfully");

      storeTokenInCookie(result?.data?.data.accessToken);
      dispatch(storeAuthToken(result?.data?.data.accessToken));
      localStorage.setItem("jwt", result?.data?.data.accessToken);

      dispatch(storeUserInfo(result?.data?.user));
      setSelectedMenu("Overview");

      router.push("/");
      window.location.reload();
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {/* Left Column - Login Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      {/* <Link
                        href="/forgot-password"
                        className="text-sm underline"
                      >
                        Forgot your password?
                      </Link> */}
                    </div>
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>role</FormLabel>
                    </div>
                    <FormControl>
                      <select {...field} className="border rounded-md p-2">
                        <option value="patient">Patient</option>
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="staff">Staff</option>
                        <option value="nurse">Nurse</option>
                      </select>
                    </FormControl>
                    <FormMessage>{errors.role?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </FormProvider>
          <Button
            onClick={() => {
              autoLogin("admin");
            }}
            className="w-full mt-4"
            disabled={loading}
          >
            Loggin as Admin
          </Button>
          <Button
            onClick={() => {
              autoLogin("doctor");
            }}
            className="w-full mt-4"
            disabled={loading}
          >
            Loggin as Doctor
          </Button>
          <Button
            onClick={() => {
              autoLogin("patient");
            }}
            className="w-full mt-4"
            disabled={loading}
          >
            Loggin as Patient
          </Button>
          <Button
            onClick={() => {
              autoLogin("staff");
            }}
            className="w-full mt-4"
            disabled={loading}
          >
            Loggin as Staff
          </Button>
          <div className=" text-right text-sm">
            <Link href="/forgetPassword" className="underline">
              Forget Password
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Cover Image */}
      <div className="hidden bg-muted lg:block">
        <Image
          src={loginImage}
          alt="Login Cover"
          width={1920}
          height={1080}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
