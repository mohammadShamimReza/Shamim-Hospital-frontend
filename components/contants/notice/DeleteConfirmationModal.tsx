import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmationText: string;
  setConfirmationText: (text: string) => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  confirmationText,
  setConfirmationText,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p>Type &quot;DELETE&quot; to confirm deletion.</p>
        <Input
          placeholder="Type DELETE to confirm"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          className="my-4"
        />
        <ModalFooter>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={confirmationText !== "DELETE"}
          >
            Confirm Delete
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
