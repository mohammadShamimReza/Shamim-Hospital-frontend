"use client";


import Account from "@/components/contants/Account";
import DoctorPage from "@/components/contants/doctor/DoctorPage";

import DoctorAppointmentsPage from "@/components/contants/DoctorAppointment";
import Header from "@/components/contants/Header";
import InboxPage from "@/components/contants/Inbox";
import NoticePage from "@/components/contants/notice/NoticePage";
import NotificationPage from "@/components/contants/Notification";
import NursePage from "@/components/contants/nurse/NursePage";
import Overview from "@/components/contants/Overview";
import ServicesPage from "@/components/contants/service/ServicesPage";
import StaffPage from "@/components/contants/staff/StaffPage";
import UserPage from "@/components/contants/user/UserPage";
import UserAppointmentsPage from "@/components/contants/UserAppointment";
import MySidebarContant from "@/components/sidebar/MySidebarContant";
import MySidebarFooter from "@/components/sidebar/MySidebarFooter";
import MySidebarHeader from "@/components/sidebar/MySidebarHeader";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";


export default function Page() {
  const { selectedMenu } = useNavigation();
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <MySidebarHeader />
        <MySidebarContant />
        <MySidebarFooter />
      </Sidebar>
      <SidebarInset>
        <Header />
        {selectedMenu === "Overview" && <Overview />}
        {selectedMenu === "Doctors" && <DoctorPage />}
        {selectedMenu === "Patients" && <UserPage />}
        {selectedMenu === "Staff" && <StaffPage />}
        {selectedMenu === "Nurses" && <NursePage />}
        {selectedMenu === "Notice" && <NoticePage />}
        {selectedMenu === "Inbox" && <InboxPage />}
        {selectedMenu === "Services" && < ServicesPage/>}
        {selectedMenu === "Appointments" && <UserAppointmentsPage />}
        {selectedMenu === "Appointments" && <DoctorAppointmentsPage />}
        {selectedMenu === "Account" && <Account />}
        {selectedMenu === "Notifications" && <NotificationPage />}
      </SidebarInset>
    </SidebarProvider>
  );
}
