import { useAppSelector } from "@/redux/hooks";
import MySidebarContant from "../../sidebar/MySidebarContant";
import MySidebarFooter from "../../sidebar/MySidebarFooter";
import MySidebarHeader from "../../sidebar/MySidebarHeader";
import { Sidebar, SidebarProvider } from "../../ui/sidebar";
import AdminContantPage from "./AdminContantPage";

export default function MainPage() {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  console.log(userInfo);

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <MySidebarHeader />
        <MySidebarContant />
        <MySidebarFooter />
      </Sidebar>
      {userInfo?.role === "admin" && <AdminContantPage />}
    </SidebarProvider>
  );
}
