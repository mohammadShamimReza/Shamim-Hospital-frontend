"use client";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { storeTokenInCookie } from "@/lib/auth/token";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigation } from "@/contexts/NavigatoinContext";

// Define validation schema with Zod
const signupSchema = z.object({
  
  name: z.string().min(1, "name name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.number().min(10, "Invalid phone number format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain a letter, a number, and a special character"
  ),
  
  address: z.string().optional(),

  role: z.string().min(2, "Role is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const {setSelectedMenu} = useNavigation()
    const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
    const [createUser] = useCreateUserMutation()
  const formMethods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: 0,
      address: "",
      role: "patient"
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
    // Simulated API call
       if (data.email !== "" && data.password !== "") {
         try {
           const result = await createUser(data);
           console.log(result);
            setSelectedMenu('overview');
           if (result?.error) {
             toast("User not created successfully", {
               style: {
                 backgroundColor: "red",
                 color: "white",
               },
             });
           } else {
             toast("User created successfully");
       
             storeTokenInCookie(result?.data?.data.accessToken);
             dispatch(storeAuthToken(result?.data?.data.accessToken));
             localStorage.setItem("jwt", result?.data?.data.accessToken);

             dispatch(storeUserInfo(result?.data?.user));
             router.push("/");
                      window.location.reload();

           }
         } catch (error) {
           console.log(error);
         }
       } else {
         alert("Invalid email or password.");
       }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
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
                      value={"patient"}
                      disabled
                    />
                  </FormControl>
                  <FormMessage>{errors.role?.message}</FormMessage>
                </FormItem>
              )}
                />
                </div>
              <Button type="submit" className="w-full">
                Create an Account
              </Button>
              
            </form>
          </FormProvider>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
