"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigation } from "@/contexts/NavigatoinContext";
import { Moon, Sun } from "lucide-react"; // Replace with icons from your icon set if needed
import { useTheme } from "next-themes";

export default function Header() {
  const { selectedMenu } = useNavigation();
  const { theme, setTheme } = useTheme();

  // Function to toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex h-16 items-center justify-between px-4 border-b ">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          {selectedMenu || "Dashboard"}
        </div>
      </div>
      <div>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
}
