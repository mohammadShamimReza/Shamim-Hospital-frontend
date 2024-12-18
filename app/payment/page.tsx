"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePaymentInitMutation } from "@/redux/api/paymentApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toast } from "sonner";

// Define the structure for payment data
type PaymentFormValues = {
  cus_name: string;
  cus_email: string;
  total_amount: number;
  product_name: string;
  product_category: string;
  product_profile: string;
  cus_add1: string;
  cus_country: string;
  cus_phone: string;
  currency: "USD" | "BDT";
  userId: string;
};

const PaymentPage = () => {
  const [paymentInit] = usePaymentInitMutation();
  const [loading, setLoading] = useState(false);

  const user = useAppSelector((state) => state.auth.userInfo);

  const price = 5000;

  const data: PaymentFormValues = {
    cus_name: user.name,
    cus_email: user.email,
    currency: "BDT",
    total_amount: price,
    userId: user.id.toString(),
    product_name: "Detox-dopamine",
    product_category: "Mental & physical",
    product_profile: "Fitraat",
    cus_add1: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: user.phone.toString(),
  };

  const handlePayment = async (data: PaymentFormValues) => {
    setLoading(true);
    try {
      const result = await paymentInit(data).unwrap();
      if (result?.url) {
        window.location.replace(result.url);
      } else {
        toast("Please try again later");
      }
    } catch (error) {
      console.log(error);
      toast("Server has some issues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {user.address}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p className="text-lg font-bold text-green-600">Price: ${price}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => handlePayment(data)}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentPage;
