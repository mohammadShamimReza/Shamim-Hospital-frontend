"use client";

import { Nurse } from "@/schemas/nurseSchema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NurseTableProps {
  nurseList: Nurse[] | null;
  onEdit: (nurse: Nurse) => void;
  onDelete: (index: number) => void;
  onView: (nurse: Nurse) => void;
}

export default function NurseTable({
  nurseList,
  onEdit,
  onDelete,
  onView,
}: NurseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
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
                  onClick={() => { onEdit(nurse)}}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(id)}
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
