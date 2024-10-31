import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import DoctorOverview from "./DoctorOverview";


import DoctorAppointmen from "./DoctorAppointment/DoctorAppointmen";
import DoctorNoticePage from "./DoctorNotice/DoctorNoticePage";
import DoctorInboxPage from "./DoctorInbox/DoctorInboxPage";
import DoctorAccountPage from "./DoctorAccount/DoctorAccountPage";

export default function DoctorContantPage() {
  const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <DoctorOverview />}
          {selectedMenu === "Appointment" && <DoctorAppointmen />}
          
      {selectedMenu === "Notice" && <DoctorNoticePage />}
      {selectedMenu === "Inbox" && <DoctorInboxPage />}
      {selectedMenu === "Account" && <DoctorAccountPage />}
    </SidebarInset>
  );
}
