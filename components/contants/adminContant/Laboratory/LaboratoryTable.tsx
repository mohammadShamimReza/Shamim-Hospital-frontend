"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Laboratory } from "@/schemas/laboratorySchema";

interface LaboratoryTableProps {
  laboratorys: Laboratory[];
  onEdit: (laboratory: Laboratory) => void;
  onDelete: (laboratory: Laboratory) => void;
  onView: (laboratory: Laboratory) => void;
  isLoading: boolean;
}

export default function LaboratoryTable({
  laboratorys,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: LaboratoryTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {laboratorys.map((laboratory, index) => (
          <TableRow key={index}>
            <TableCell>{laboratory.testName}</TableCell>
            <TableCell>{laboratory.price}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(laboratory)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(laboratory)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(laboratory)}
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
