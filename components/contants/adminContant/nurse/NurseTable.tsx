"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Nurse } from "@/schemas/nurseSchema";

interface NurseTableProps {
  nurseList: Nurse[] | null;
  onEdit: (nurse: Nurse) => void;
  onDelete: (nurse: Nurse) => void;
  onView: (nurse: Nurse) => void;
  isLoading: boolean;
}

export default function NurseTable({
  nurseList,
  onEdit,
  onDelete,
  onView,
  isLoading
}: NurseTableProps) {
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {nurseList?.map((nurse, id) => (
          <TableRow key={id}>
            <TableCell>{nurse.name}</TableCell>
            <TableCell>{nurse.email}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onEdit(nurse);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(nurse)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(nurse)}
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
