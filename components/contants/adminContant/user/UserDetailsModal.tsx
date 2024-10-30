import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { User } from "@/schemas/userSchema";

interface UserDetailsModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

export default function UserDetailsModal({
  isOpen,
  user,
  onClose,
}: UserDetailsModalProps) {
  if (!user) return null;


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">User Details</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
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
