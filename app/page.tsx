"use client";

import MainPage from "@/components/contants/MainPage";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken } from "@/redux/slice/authSlice";
import { useEffect, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  // const {
  //   data: userData,
  //   isLoading,
  //   isError: authenticatedUserInfoDataError,
  // } = useGetUserInfoQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
    const tokenFromLocalStorage = getTokenFromCookie();
    if (tokenFromLocalStorage) {
      dispatch(storeAuthToken(tokenFromLocalStorage));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (userData) {
  //     dispatch(storeUserInfo(userData));
  //   }
  // }, [userData, dispatch]);



  if (!isMounted) {
    return (
      <>
        <h2>Reload the page</h2>
      </>
    );
  }

  return (
    <MainPage />
  );
}
