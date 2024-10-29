import { SidebarInset } from '@/components/ui/sidebar';
import React from 'react'
import Header from './Header';
import Overview from './Overview';
import DoctorPage from './doctor/DoctorPage';
import UserPage from './user/UserPage';
import StaffPage from './staff/StaffPage';
import NursePage from './nurse/NursePage';
import NoticePage from './notice/NoticePage';
import InboxPage from './Inbox';
import ServicesPage from './service/ServicesPage';
import UserAppointmentsPage from './UserAppointment';
import DoctorAppointmentsPage from './DoctorAppointment';
import Account from './Account';
import NotificationPage from './Notification';
import { useNavigation } from '@/contexts/NavigatoinContext';

export default function AdminContantPage() {
      const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <Overview />}
      {selectedMenu === "Doctors" && <DoctorPage />}
      {selectedMenu === "Patients" && <UserPage />}
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
  );
}
