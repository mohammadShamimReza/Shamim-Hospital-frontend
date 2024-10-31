import { SidebarInset } from '@/components/ui/sidebar';
import { useNavigation } from "@/contexts/NavigatoinContext";
import AccountPage from "./account/AccountPage";
import DoctorPage from "./doctor/DoctorPage";
import DoctorAppointmentsPage from "./DoctorAppointment";
import Header from '../Header';
import InboxPage from "./Inbox/Inbox";
import NoticePage from "./notice/NoticePage";
import NursePage from "./nurse/NursePage";
import Overview from "./Overview";
import ServicesPage from './service/ServicesPage';
import StaffPage from "./staff/StaffPage";
import UserPage from "./user/UserPage";
import UserAppointmentsPage from "./UserAppointment";
import RoomPage from './room/RoomPage';

export default function AdminContantPage() {
      const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <Overview />}
      {selectedMenu === "Doctors" && <DoctorPage />}
      {selectedMenu === "Patients" && <UserPage />}
      {selectedMenu === "Room" && <RoomPage />}
      {selectedMenu === "Staff" && <StaffPage />}
      {selectedMenu === "Nurses" && <NursePage />}
      {selectedMenu === "Notice" && <NoticePage />}
      {selectedMenu === "Inbox" && <InboxPage />}
      {selectedMenu === "Services" && <ServicesPage />}
      {selectedMenu === "Appointments" && <UserAppointmentsPage />}
      {selectedMenu === "Appointments" && <DoctorAppointmentsPage />}
      {selectedMenu === "Account" && <AccountPage />}
    </SidebarInset>
  );
}
