"use client";

import MainPage from "@/components/contants/adminContant/MainPage";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useAppDispatch();
  const tokenFromLocalStorage = useMemo(() => getTokenFromCookie(), []);
  const { data: userData } = useGetUserInfoQuery({ undefined });

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

  // Render a loading message if not mounted
  if (!isMounted) {
    return <h2>Loading...</h2>;
  }

  return <MainPage />;
}
