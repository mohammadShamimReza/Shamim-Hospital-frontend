"use client";

import MainPage from "@/components/contants/MainPage";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/contexts/NavigatoinContext";
import { getTokenFromCookie, removeToken } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useGetUserbyIdQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeAuthToken,
  storeAuthToken,
  storeUserInfo,
} from "@/redux/slice/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useAppDispatch();
  const tokenFromLocalStorage = useMemo(() => {
    // Only access localStorage if running in the browser
    if (typeof window !== "undefined") {
      return getTokenFromCookie();
    }
    return null;
  }, []);

  const { data: userData, isLoading } = useGetUserInfoQuery({ undefined });

  // Set initial mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Store token in Redux if available
  useEffect(() => {
    if (tokenFromLocalStorage) {
      dispatch(storeAuthToken(tokenFromLocalStorage));
    }
  }, [tokenFromLocalStorage, dispatch]);

  // Store user data in Redux when available
  useEffect(() => {
    if (userData) {
      dispatch(storeUserInfo(userData?.data));
    }
  }, [userData, dispatch]);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { data: userAllData } = useGetUserbyIdQuery({ id: userInfo.id });

  const router = useRouter();
  const { setSelectedMenu } = useNavigation();
  console.log(userAllData);
  const handleLogOut = () => {
    dispatch(removeAuthToken());
    dispatch(
      storeUserInfo({
        name: "",
        email: "",
        role: "",
        id: "",
        phone: 0,
        address: "",
        payment: false,
      })
    );
    removeToken();
    setSelectedMenu("Overview");
    router.push("/login");
    window.location.reload();
  };

  // Render a loading message if not mounted
  if (!isMounted && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold  animate-pulse">Loading...</h2>
      </div>
    );
  }

  if (
    userAllData?.data?.role === "patient" &&
    userAllData?.data?.payment === false
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            You need to make a payment to access this page.
          </h2>
          <Link href="/payment">
            <Button variant="default">Go to Payment Page</Button>
          </Link>

          <br />
          <br />

          <Button onClick={() => handleLogOut()} variant="default">
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return <MainPage />;
}
