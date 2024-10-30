import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Nurse } from "@/schemas/nurseSchema";

interface NurseDetailsModalProps {
  isOpen: boolean;
  nurse: Nurse | null;
  onClose: () => void;
}

export default function NurseDetailsModal({
  isOpen,
  nurse,
  onClose,
}: NurseDetailsModalProps) {
  if (!nurse) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Nurse Details</h3>
        <p>
          <strong>Name:</strong> {nurse.name}
        </p>
        <p>
          <strong>Email:</strong> {nurse.email}
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
