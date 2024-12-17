import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Notice } from "@/schemas/noticeSchema";

interface NoticeDetailsModalProps {
  isDetailsModalOpen: boolean;
  notice: Notice | null;
  onClose: () => void;
}

export default function NoticeDetailsModal({
  isDetailsModalOpen,
  notice,
  onClose,
}: NoticeDetailsModalProps) {
  if (!notice) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Notice Details</h3>
        <p>
          <strong>Title:</strong> {notice.title}
        </p>

        <p>
          <strong>Content:</strong> {notice.content}
        </p>
        <p>
          <strong>Expair IN:</strong> {notice.expiryDate}
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
