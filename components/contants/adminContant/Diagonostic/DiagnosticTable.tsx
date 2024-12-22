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
import { Diagnostic } from "@/schemas/diagnosticSchema";

interface DiagnosticTableProps {
  diagnostics: Diagnostic[];
  onEdit: (diagnostic: Diagnostic) => void;
  onDelete: (diagnostic: Diagnostic) => void;
  onView: (diagnostic: Diagnostic) => void;
  isLoading: boolean;
}

export default function DiagnosticTable({
  diagnostics,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: DiagnosticTableProps) {
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
        {diagnostics.map((diagnostic, index) => (
          <TableRow key={index}>
            <TableCell>{diagnostic.diagnosticName}</TableCell>
            <TableCell>{diagnostic.price}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(diagnostic)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(diagnostic)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(diagnostic)}
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
