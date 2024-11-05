"use client";

import { Staff } from "@/schemas/staffSchema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StaffTableProps {
  staffList: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  onView: (staff: Staff) => void;
  isLoading: boolean;
}

export default function StaffTable({
  staffList,
  onEdit,
  onDelete,
  onView,
  isLoading
}: StaffTableProps) {
      if (isLoading) {
        return (
          <div className="flex items-center justify-center py-4">
            <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
          </div>
        );
      }
  return (
    
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffList.map((staff, index) => (
          <TableRow key={index}>
            <TableCell>{staff.name}</TableCell>
            <TableCell>{staff.email}</TableCell>
            <TableCell>{staff.role}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(staff)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(staff)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(staff)}
                >
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
