import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import UserAccountPage from "./Account/UserAccountPage";
import UserAppointmentPage from "./Appointment/UserAppointmentPage";
import UserDoctorPage from "./Doctors/UserDoctorPage";
import UserInboxPage from "./Inbox/UserInboxPage";
import UserServicePage from "./Service/UserServicePage";
import UserOverviewKPage from "./UserOverview";
import UserNoticePage from "./Notice/UserNoticePage";

export default function UserContantPage() {
  const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <UserOverviewKPage />}
      {selectedMenu === "Services" && <UserServicePage />}
      {selectedMenu === "Doctors" && <UserDoctorPage />}
      {selectedMenu === "Appointments" && <UserAppointmentPage />}
      {selectedMenu === "Inbox" && <UserInboxPage />}
      {selectedMenu === "Notice" && <UserNoticePage />}
      {selectedMenu === "Account" && <UserAccountPage />}
    </SidebarInset>
  );
}
