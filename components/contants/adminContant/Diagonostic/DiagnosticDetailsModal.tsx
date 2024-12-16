import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Diagnostic } from "@/schemas/diagnosticSchema";

interface diagnosticDetailsModalProps {
  isDetailsModalOpen: boolean;
  diagnostic: Diagnostic | null;
  onClose: () => void;
}

export default function DiagnosticDetailsModal({
  isDetailsModalOpen,
  diagnostic,
  onClose,
}: diagnosticDetailsModalProps) {
  if (!diagnostic) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">diagnostic Details</h3>
        <p>
          <strong>Name:</strong> {diagnostic.diagnosticName}
        </p>
        <p>
          <strong>Price:</strong> {diagnostic.price}
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
