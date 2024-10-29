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
  nurseList: Nurse[];
  onEdit: (nurse: Nurse, index: number) => void;
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
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Shift</TableHead>
          <TableHead>Employment Date</TableHead>
          <TableHead>Profile Image</TableHead>
          <TableHead>Room ID</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {nurseList.map((nurse, index) => (
          <TableRow key={nurse.id ?? index}>
            <TableCell>{nurse.name}</TableCell>
            <TableCell>{nurse.email}</TableCell>
            <TableCell>{nurse.phone}</TableCell>
            <TableCell>{nurse.address || "N/A"}</TableCell>
            <TableCell>{nurse.department}</TableCell>
            <TableCell>{nurse.shift}</TableCell>
            <TableCell>{nurse.employmentDate || "N/A"}</TableCell>
            <TableCell>
              {nurse.profile_image ? (
                <img
                  src={nurse.profile_image}
                  alt={`${nurse.name}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell>{nurse.roomId ?? "N/A"}</TableCell>
            <TableCell>{nurse.role}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(nurse, index)}
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
