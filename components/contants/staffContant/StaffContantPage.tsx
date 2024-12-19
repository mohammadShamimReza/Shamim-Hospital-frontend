import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import StaffAccountPage from "./Account/StaffAccountPage";
import StaffInboxPage from "./Inbox/StaffInboxPage";
import StaffNoticePage from "./Notice/StaffNoticePage";
import StaffRoom from "./Room/StaffRoom";
import StaffOverview from "./StaffOverview";
import StaffAppointment from "./appointment/StaffAppointment";

export default function StaffContantPage() {
  const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <StaffOverview />}
      {selectedMenu === "Room" && <StaffRoom />}
      {selectedMenu === "Notice" && <StaffNoticePage />}
      {selectedMenu === "Inbox" && <StaffInboxPage />}
      {selectedMenu === "Account" && <StaffAccountPage />}

      {selectedMenu === "Appointments" && <StaffAppointment />}
    </SidebarInset>
  );
}
