"use client";

import { Doctor } from "@/schemas/doctorSchema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor, index: number) => void;
  onDelete: (index: number) => void;
}

export default function DoctorTable({
  doctors,
  onEdit,
  onDelete,
}: DoctorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor, index) => (
          <TableRow key={index}>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>{doctor.phone}</TableCell>
            <TableCell>{doctor.designation}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(doctor, index)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
