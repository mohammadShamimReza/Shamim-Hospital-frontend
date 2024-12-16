"use client";

import { Input } from "@/components/ui/input";

interface LaboratorySearchProps {
  searchEmail: string;
  onSearch: (email: string) => void;
}

export default function LaboratorySearch({
  searchEmail,
  onSearch,
}: LaboratorySearchProps) {
  return (
    <Input
      placeholder="Search by email"
      value={searchEmail}
      onChange={(e) => onSearch(e.target.value)}
      className="w-1/2"
    />
  );
}
