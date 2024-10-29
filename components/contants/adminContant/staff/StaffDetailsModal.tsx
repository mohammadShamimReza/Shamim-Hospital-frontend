import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Staff } from "@/schemas/staffSchema";

interface StaffDetailsModalProps {
  isOpen: boolean;
  staff: Staff | null;
  onClose: () => void;
}

export default function StaffDetailsModal({
  isOpen,
  staff,
  onClose,
}: StaffDetailsModalProps) {
  if (!staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Staff Details</h3>
        <p>
          <strong>Name:</strong> {staff.name}
        </p>
        <p>
          <strong>Email:</strong> {staff.email}
        </p>
        <p>
          <strong>Role:</strong> {staff.role}
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
