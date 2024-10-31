import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface RoomDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RoomDeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: RoomDeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete this notice?</p>
        <ModalFooter>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm Delete
          </Button>
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
