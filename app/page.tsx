"use client";


import Account from "@/components/contants/Account";
import DoctorPage from "@/components/contants/Doctor";
import DoctorAppointmentsPage from "@/components/contants/DoctorAppointment";
import Header from "@/components/contants/Header";
import InboxPage from "@/components/contants/Inbox";
import NursePage from "@/components/contants/Naurse";
import NoticePage from "@/components/contants/Notice";
import NotificationPage from "@/components/contants/Notification";
import Overview from "@/components/contants/Overview";
import PatientPage from "@/components/contants/Patient";
import ServicesPage from "@/components/contants/Service";
import StaffPage from "@/components/contants/Staff";
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
  console.log(selectedMenu);
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
        {selectedMenu === "Patients" && <PatientPage />}
        {selectedMenu === "Staff" && <StaffPage />}
        {selectedMenu === "Nurses" && <NursePage />}
        {selectedMenu === "Notice" && <NoticePage />}
        {selectedMenu === "Inbox" && <InboxPage />}
        {selectedMenu === "Services" && <ServicesPage />}
        {selectedMenu === "Appointments" && <UserAppointmentsPage />}
        {selectedMenu === "Appointments" && <DoctorAppointmentsPage />}
        {selectedMenu === "Account" && <Account />}
        {selectedMenu === "Notifications" && <NotificationPage />}
      </SidebarInset>
    </SidebarProvider>
  );
}
