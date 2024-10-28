"use client";


import DoctorPage from "@/components/contants/Doctor";
import Header from "@/components/contants/Header";
import InboxPage from "@/components/contants/Inbox";
import NursePage from "@/components/contants/Naurse";
import NoticePage from "@/components/contants/Notice";
import Overview from "@/components/contants/Overview";
import PatientPage from "@/components/contants/Patient";
import ServicesPage from "@/components/contants/Service";
import StaffPage from "@/components/contants/Staff";
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
      </SidebarInset>
    </SidebarProvider>
  );
}
