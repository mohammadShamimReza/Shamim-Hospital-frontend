import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddStaffAndNurse from "./AddStaffAndNurse";
import { Room } from "@/type/Index";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useUpdateRoomMutation } from "@/redux/api/roomApi";
import { toast } from "sonner";

interface RoomTableProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  onView: (room: Room) => void;
  isLoading: boolean;
}

export default function RoomTable({
  rooms,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: RoomTableProps) {
  const [updateRoom] = useUpdateRoomMutation();

  const handleRemovePerson = async (
    roomId: number,
    personId: number,
    role: "nurse" | "staff"
  ) => {
    try {
      const payload =
        role === "nurse"
          ? { removeNurses: [personId] }
          : { removeStaff: [personId] };

      const result = await updateRoom({ id: roomId, body: payload }).unwrap();

      if (result?.error) {
        toast("Something went wrong");
      } else {
        toast("Removed successfully");
      }
      console.log("Person removed from room:", result);
    } catch (error) {
      console.error("Error removing person:", error);
      toast("Error removing person");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="text-center">
        <TableRow>
          <TableHead>Room Name / Number</TableHead>
          <TableHead>Room Nurse and Staff Needed</TableHead>
          <TableHead>Added Nurse and Staff</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <TableRow key={room.id}>
            <TableCell>{room.roomNumber}</TableCell>
            <TableCell className="text-lg font-semibold">
              {room.needNurseAndStaff}
            </TableCell>
            <TableCell className="flex justify-center items-center gap-4">
              <HoverCard>
                <HoverCardTrigger className="text-lg font-semibold underline">
                  {room.nurses?.length + room.staff?.length || 0}
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Nurses</h4>
                    {room.nurses?.length ? (
                      room.nurses.map((nurse) => (
                        <div
                          key={nurse.id}
                          className="flex justify-between items-center"
                        >
                          <span>{nurse.name}</span>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleRemovePerson(room.id, nurse.id, "nurse")
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No nurse assigned</p>
                    )}
                    <h4 className="font-semibold mt-4">Staff</h4>
                    {room.staff?.length ? (
                      room.staff.map((staff) => (
                        <div
                          key={staff.id}
                          className="flex justify-between items-center"
                        >
                          <span>{staff.name}</span>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleRemovePerson(room.id, staff.id, "staff")
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No staff assigned</p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>

              <AddStaffAndNurse roomId={room.id} />
            </TableCell>

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
