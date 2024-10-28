import {
  BookA,
  BriefcaseMedical,
  FolderKanban,
  HandPlatter,
  Inbox,
  PersonStanding,
  Shell,
  UserRoundMinusIcon,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const data = {
  user: {
    name: "Shamim (admin)",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: FolderKanban,
      isActive: true,
    },
    {
      title: "Doctors",
      url: "#",
      icon: BriefcaseMedical,
    },
    {
      title: "Patients",
      url: "#",
      icon: PersonStanding,
    },
    {
      title: "Staff",
      url: "#",
      icon: BookA,
    },
    {
      title: "Naurse",
      url: "#",
      icon: UserRoundMinusIcon,
    },
    {
      title: "Notice",
      url: "#",
      icon: Shell,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Services",
      url: "#",
      icon: HandPlatter,
    },
  ],
};

export default function MySidebarContant() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>My works</SidebarGroupLabel>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={item.isActive}
              >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
