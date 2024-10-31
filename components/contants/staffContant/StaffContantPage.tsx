import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import StaffRoom from "./Room/StaffRoom";
import StaffOverview from "./StaffOverview";
import StaffNoticePage from "./Notice/StaffNoticePage";
import StaffAccountPage from "./Account/StaffAccountPage";
import StaffInboxPage from "./Inbox/StaffInboxPage";


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
    </SidebarInset>
  );
}
