"use client";


import { useNavigation } from "@/contexts/NavigatoinContext";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { SidebarNavMenus } from "./NavMenu";



export default function MySidebarContant() {
  const { selectedMenu, setSelectedMenu } = useNavigation();
  const [role, setRole] = useState("");

  const navMenus = SidebarNavMenus;

  let menus 

  if (role === "admin") {
    menus = navMenus.navAdmin
  } else if (role === "doctor") {
    menus = navMenus.navDoctor
  } else if (role === "patient") {
    menus = navMenus.navPatient
  } else if (role === "staff") {
    menus = navMenus.navStaff;
  } else if (role === "nurse") { 
    menus = navMenus.navNurse;
  } else {
    menus = navMenus.navSuperAdmin
  }

  const UserInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (UserInfo) {
      setRole(UserInfo.role);
    }
  }, [UserInfo]);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>My place</SidebarGroupLabel>
        <SidebarMenu>
          {menus.map((item) => (
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
