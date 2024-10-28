"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
  
interface NavigationContextProps {
  selectedMenu: string | null;
  setSelectedMenu: (menu: string) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>("Overview");

  // Retrieve the menu selection from Local Storage on load
  useEffect(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) setSelectedMenu(savedMenu);
  }, []);

  // Save the selection to Local Storage whenever it changes
  useEffect(() => {
    if (selectedMenu) localStorage.setItem("selectedMenu", selectedMenu);
  }, [selectedMenu]);

  return (
    <NavigationContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context)
    throw new Error("useNavigation must be used within a NavigationProvider");
  return context;
};
