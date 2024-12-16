import { SidebarInset } from '@/components/ui/sidebar';
import { useNavigation } from "@/contexts/NavigatoinContext";
import AdminAppointmentPage from "../doctorContant/DoctorAppointment/DoctorAppointmenPage";
import Header from "../Header";
import AccountPage from "./account/AccountPage";
import DiagonosticPage from "./Diagonostic/DiagnosticPage";
import DoctorPage from "./doctor/DoctorPage";
import InboxPage from "./Inbox/Inbox";
import InventoryPage from "./Inventory/InventoryPage";
import LaboratoryPage from "./Laboratory/LaboratoryPage";
import NoticePage from "./notice/NoticePage";
import NursePage from "./nurse/NursePage";
import Overview from "./Overview";
import PharmacyPage from "./Pharmacy/PharmacyPage";
import RoomPage from "./room/RoomPage";
import ServicesPage from "./service/ServicesPage";
import StaffPage from "./staff/StaffPage";
import UserPage from "./user/UserPage";

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
      {selectedMenu === "Appointments" && <AdminAppointmentPage />}
      {selectedMenu === "Account" && <AccountPage />}
      {selectedMenu === "Pharmacy" && <PharmacyPage />}
      {selectedMenu === "Laboratory" && <LaboratoryPage />}
      {selectedMenu === "Diagonostic" && <DiagonosticPage />}
      {selectedMenu === "Inventory" && <InventoryPage />}
    </SidebarInset>
  );
}
