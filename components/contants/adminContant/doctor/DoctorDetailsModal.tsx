import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/schemas/doctorSchema";

interface doctorDetailsModalProps {
  isDetailsModalOpen: boolean;
  doctor: Doctor | null;
  onClose: () => void;
}

export default function DoctorDetailsModal({
  isDetailsModalOpen,
  doctor,
  onClose,
}: doctorDetailsModalProps) {
  if (!doctor) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">doctor Details</h3>
        <p>
          <strong>Name:</strong> {doctor.name}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
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
