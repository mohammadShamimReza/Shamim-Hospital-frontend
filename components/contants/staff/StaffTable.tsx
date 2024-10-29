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
  onEdit: (staff: Staff, index: number) => void;
  onView: (staff: Staff) => void;
}

export default function StaffTable({
  staffList,
  onEdit,
  onView,
}: StaffTableProps) {
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(staff, index)}
              >
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => onView(staff)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
