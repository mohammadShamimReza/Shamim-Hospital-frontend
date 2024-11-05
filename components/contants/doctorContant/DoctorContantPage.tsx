import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import DoctorOverview from "./DoctorOverview";


import DoctorAccountPage from "./DoctorAccount/DoctorAccountPage";

import DoctorInboxPage from "./DoctorInbox/DoctorInboxPage";
import DoctorNoticePage from "./DoctorNotice/DoctorNoticePage";
import DoctorAppointmentsPage from "./DoctorAppointment/DoctorAppointmenPage";

export default function DoctorContantPage() {
  const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <DoctorOverview />}
      {selectedMenu === "Appointments" && <DoctorAppointmentsPage />}

      {selectedMenu === "Notice" && <DoctorNoticePage />}
      {selectedMenu === "Inbox" && <DoctorInboxPage />}
      {selectedMenu === "Account" && <DoctorAccountPage />}
    </SidebarInset>
  );
}
