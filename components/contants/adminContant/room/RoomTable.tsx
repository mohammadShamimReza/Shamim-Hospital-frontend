import { Room } from "@/schemas/roomSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface RoomTableProps {
  rooms: Room[];
  onEdit: (notice: Room) => void;
  onDelete: (notice: Room) => void;
  onView: (notice: Room) => void;
}

export default function RoomTable({
  rooms,
  onEdit,
  onDelete,
  onView,
}: RoomTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room Name / Number</TableHead>
          <TableHead>Room Nurse and staff needed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room, index) => (
          <TableRow key={index}>
            <TableCell>{room.roomNumber}</TableCell>
            <TableCell>{room.needNurseAndStaff}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(room)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(room)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(room)}
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
