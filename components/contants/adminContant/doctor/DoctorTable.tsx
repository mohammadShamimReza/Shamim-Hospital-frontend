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
import { Doctor } from "@/schemas/doctorSchema";

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  onView: (doctor: Doctor) => void;
  isLoading: boolean;
}

export default function DoctorTable({
  doctors,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: DoctorTableProps) {
  console.log(doctors);
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
          <TableHead>Phone</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Service</TableHead>
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
              {(doctor as unknown as { Service?: { serviceName: string } })
                ?.Service?.serviceName || "Not addigned"}
            </TableCell>

            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(doctor)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(doctor)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(doctor)}
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
