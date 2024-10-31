import { SidebarInset } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import Header from "../Header";
import NurseRoom from "./Room/NurseRoom";
import NurseOverview from "./NurseOverview";
import NurseNoticePage from "./Notice/NurseNoticePage";
import NurseAccountPage from "./Account/NurseAccountPage";
import NurseInboxPage from "./Inbox/NurseInboxPage";


export default function NurseContantPage() {
  const { selectedMenu } = useNavigation();

  return (
    <SidebarInset>
      <Header />
      {selectedMenu === "Overview" && <NurseOverview />}
      {selectedMenu === "Room" && <NurseRoom />}
      {selectedMenu === "Notice" && <NurseNoticePage />}
      {selectedMenu === "Inbox" && <NurseInboxPage />}
      {selectedMenu === "Account" && <NurseAccountPage />}
    </SidebarInset>
  );
}
