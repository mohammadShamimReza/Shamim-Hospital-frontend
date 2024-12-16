import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Pharmacy } from "@/schemas/pharmacySchema";

interface pharmacyDetailsModalProps {
  isDetailsModalOpen: boolean;
  pharmacy: Pharmacy | null;
  onClose: () => void;
}

export default function PharmacyDetailsModal({
  isDetailsModalOpen,
  pharmacy,
  onClose,
}: pharmacyDetailsModalProps) {
  if (!pharmacy) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">pharmacy Details</h3>
        <p>
          <strong>Name:</strong> {pharmacy.name}
        </p>
        <p>
          <strong>Stock:</strong> {pharmacy.stockQuantity}
        </p>
        <p>
          <strong>Price:</strong> {pharmacy.unitPrice}
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
