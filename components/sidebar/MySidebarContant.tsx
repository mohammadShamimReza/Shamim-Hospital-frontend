"use client";

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
import { useNavigation } from "@/contexts/NavigatoinContext";

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
      title: "Nurses",
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
  const { selectedMenu, setSelectedMenu } = useNavigation();


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
                isActive={selectedMenu === item.title}
                onClick={() => setSelectedMenu(item.title)}
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
