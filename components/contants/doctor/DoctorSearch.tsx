"use client";

import { Input } from "@/components/ui/input";

interface DoctorSearchProps {
  searchEmail: string;
  onSearch: (email: string) => void;
}

export default function DoctorSearch({
  searchEmail,
  onSearch,
}: DoctorSearchProps) {
  return (
    <Input
      placeholder="Search by email"
      value={searchEmail}
      onChange={(e) => onSearch(e.target.value)}
      className="w-1/2"
    />
  );
}
