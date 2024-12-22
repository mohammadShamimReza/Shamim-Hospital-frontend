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
import { Inventory } from "@/schemas/inventorySchema";

interface InventoryTableProps {
  inventorys: Inventory[];
  onEdit: (inventory: Inventory) => void;
  onDelete: (inventory: Inventory) => void;
  onView: (inventory: Inventory) => void;
  isLoading: boolean;
}

export default function InventoryTable({
  inventorys,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: InventoryTableProps) {
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
          <TableHead>purchesDate</TableHead>
          <TableHead>quentity</TableHead>
          <TableHead>status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventorys.map((inventory, index) => (
          <TableRow key={index}>
            <TableCell>{inventory.itemName}</TableCell>
            <TableCell>{inventory.price}</TableCell>
            <TableCell>{inventory.purchaseDate}</TableCell>
            <TableCell>{inventory.quantity}</TableCell>

            <TableCell>{inventory.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(inventory)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(inventory)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(inventory)}
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
