import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Laboratory } from "@/schemas/laboratorySchema";

interface laboratoryDetailsModalProps {
  isDetailsModalOpen: boolean;
  laboratory: Laboratory | null;
  onClose: () => void;
}

export default function LaboratoryDetailsModal({
  isDetailsModalOpen,
  laboratory,
  onClose,
}: laboratoryDetailsModalProps) {
  if (!laboratory) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">laboratory Details</h3>
        <p>
          <strong>Name:</strong> {laboratory.testName}
        </p>
        <p>
          <strong>Price:</strong> {laboratory.price}
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
