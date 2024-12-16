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
import { Pharmacy } from "@/schemas/pharmacySchema";

interface PharmacyTableProps {
  pharmacys: Pharmacy[];
  onEdit: (pharmacy: Pharmacy) => void;
  onDelete: (pharmacy: Pharmacy) => void;
  onView: (pharmacy: Pharmacy) => void;
  isLoading: boolean;
}

export default function PharmacyTable({
  pharmacys,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: PharmacyTableProps) {
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
          <TableHead>Expiry</TableHead>
          <TableHead>Stock Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pharmacys.map((pharmacy, index) => (
          <TableRow key={index}>
            <TableCell>{pharmacy.name}</TableCell>
            <TableCell>{pharmacy.expiryDate}</TableCell>
            <TableCell>{pharmacy.stockQuantity}</TableCell>
            <TableCell>{pharmacy.unitPrice}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(pharmacy)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(pharmacy)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(pharmacy)}
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
