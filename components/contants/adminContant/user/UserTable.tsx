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
import { User } from "@/schemas/userSchema";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user:User) => void;
  onView: (user: User) => void;
  isLoading: boolean;
}

export default function UserTable({ users, onEdit, onDelete, onView, isLoading }: UserTableProps) {
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
        {users?.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(user);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(user);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(user)}
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
