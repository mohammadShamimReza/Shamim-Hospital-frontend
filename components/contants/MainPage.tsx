import { useAppSelector } from "@/redux/hooks";
import MySidebarContant from "../sidebar/MySidebarContant";
import MySidebarFooter from "../sidebar/MySidebarFooter";
import MySidebarHeader from "../sidebar/MySidebarHeader";
import { Sidebar, SidebarProvider } from "../ui/sidebar";
import AdminContantPage from "./adminContant/AdminContantPage";
import NurseContantPage from "./nurseContant/NurseContantPage";
import StaffContantPage from "./staffContant/StaffContantPage";
import DoctorContantPage from "./doctorContant/DoctorContantPage";
import UserContantPage from "./userContant/UserMainPage";

export default function MainPage() {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <MySidebarHeader />
        <MySidebarContant />
        <MySidebarFooter />
      </Sidebar>
      {userInfo?.role === "admin" && <AdminContantPage />}
      {userInfo?.role === "nurse" && <NurseContantPage />}
      {userInfo?.role === "patient" && <UserContantPage />}

      {userInfo?.role === "staff" && <StaffContantPage />}
      {userInfo?.role === "doctor" && <DoctorContantPage />}
    </SidebarProvider>
  );
}
