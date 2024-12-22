import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import MySidebarContant from "../sidebar/MySidebarContant";
import MySidebarFooter from "../sidebar/MySidebarFooter";
import MySidebarHeader from "../sidebar/MySidebarHeader";
import { LoadingSpinner } from "../ui/loading";
import { Sidebar, SidebarProvider } from "../ui/sidebar";
import AdminContantPage from "./adminContant/AdminContantPage";
import DoctorContantPage from "./doctorContant/DoctorContantPage";
import NurseContantPage from "./nurseContant/NurseContantPage";
import StaffContantPage from "./staffContant/StaffContantPage";
import UserContantPage from "./userContant/UserMainPage";

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      setLoading(false); // Stop loading when user info is available
    } else {
      const timer = setTimeout(() => setLoading(false), 1000); // Delay for demonstration
      return () => clearTimeout(timer);
    }
  }, [userInfo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>You are not authorized</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <MySidebarHeader />
        <MySidebarContant />
        <MySidebarFooter />
      </Sidebar>
      {userInfo.role === "admin" && <AdminContantPage />}
      {userInfo.role === "nurse" && <NurseContantPage />}
      {userInfo.role === "patient" && <UserContantPage />}
      {userInfo.role === "staff" && <StaffContantPage />}
      {userInfo.role === "doctor" && <DoctorContantPage />}
    </SidebarProvider>
  );
}
