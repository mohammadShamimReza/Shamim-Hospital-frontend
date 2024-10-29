import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Service } from "@/schemas/serviceSchema";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
}

export default function ServiceDetailsModal({
  isOpen,
  service,
  onClose,
}: ServiceDetailsModalProps) {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Service Details</h3>
        <p>
          <strong>Name:</strong> {service.serviceName}
        </p>
        <p>
          <strong>Department ID:</strong> {service.departmentId ?? "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {service.status}
        </p>
        <p>
          <strong>Price:</strong> ${service.price}
        </p>
        <p>
          <strong>Description:</strong> {service.description}
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
