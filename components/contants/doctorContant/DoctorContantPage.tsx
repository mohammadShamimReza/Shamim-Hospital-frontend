import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import DoctorOverview from "./DoctorOverview";


import DoctorAccountPage from "./DoctorAccount/DoctorAccountPage";
import DoctorAppointmenPage from "./DoctorAppointment/DoctorAppointmenPage";
import DoctorInboxPage from "./DoctorInbox/DoctorInboxPage";
import DoctorNoticePage from "./DoctorNotice/DoctorNoticePage";

export default function DoctorContantPage() {
  const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <DoctorOverview />}
      {selectedMenu === "Appointments" && <DoctorAppointmenPage />}

      {selectedMenu === "Notice" && <DoctorNoticePage />}
      {selectedMenu === "Inbox" && <DoctorInboxPage />}
      {selectedMenu === "Account" && <DoctorAccountPage />}
    </SidebarInset>
  );
}
