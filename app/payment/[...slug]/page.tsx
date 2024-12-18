"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

function PaymentResult({ params }: { params: Promise<{ slug: string[] }> }) {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  // Use React.use to unwrap params
  const { slug } = React.use(params);

  const userId = Number(userInfo?.id); // Ensure userId is a number

  // Determine the payment result
  const result =
    slug[0] === "redirectSuccess"
      ? "success"
      : slug[0] === "fail"
      ? "fail"
      : slug[0] === "cancel"
      ? "cancel"
      : "";

  const isAuthorizedUser = userId === Number(slug[1]); // Convert slug[1] to a number

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            {result === "success"
              ? "Payment Successful"
              : result === "fail"
              ? "Payment Failed"
              : result === "cancel"
              ? "Payment Cancelled"
              : "Unknown Status"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result === "success" && (
            <div className="text-center">
              <p className="text-green-600 font-semibold">
                Thank you for your payment!
              </p>
              {isAuthorizedUser && (
                <p className="mt-2 text-gray-700">
                  Your payment has been successfully processed. You can now
                  enjoy premium features.
                </p>
              )}
            </div>
          )}
          {result === "fail" && (
            <div className="text-center">
              <p className="text-red-600 font-semibold">
                Your payment could not be processed.
              </p>
              <p className="mt-2 text-gray-700">
                Please try again later or contact support.
              </p>
            </div>
          )}
          {result === "cancel" && (
            <div className="text-center">
              <p className="text-yellow-600 font-semibold">
                Your payment was cancelled.
              </p>
              <p className="mt-2 text-gray-700">
                If this was unintentional, you can try again.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {result === "success" && (
            <Button onClick={() => window.location.replace("/")}>
              Go to Dashboard
            </Button>
          )}
          {(result === "fail" || result === "cancel") && (
            <Button onClick={() => window.location.replace("/payment")}>
              Retry Payment
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default PaymentResult;
