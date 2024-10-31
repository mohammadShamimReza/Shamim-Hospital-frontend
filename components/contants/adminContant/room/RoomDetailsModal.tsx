import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Room } from "@/schemas/roomSchema";

interface RoomDetailsModalProps {
  isDetailsModalOpen: boolean;
  room: Room | null;
  onClose: () => void;
}

export default function RoomDetailsModal({
  isDetailsModalOpen,
  room,
  onClose,
}: RoomDetailsModalProps) {
  if (!room) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Room Details</h3>
        <p>
          <strong>Name:</strong> {room.needNurseAndStaff}
        </p>

        <p>
          <strong>Count:</strong> ${room.roomNumber}
        </p>
        
      </ModalContent>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
