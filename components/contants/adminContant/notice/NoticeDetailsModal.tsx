import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Notice } from "@/schemas/noticeSchema";

interface NoticeDetailsModalProps {
  isOpen: boolean;
  notice: Notice | null;
  onClose: () => void;
}

export default function NoticeDetailsModal({
  isOpen,
  notice,
  onClose,
}: NoticeDetailsModalProps) {
  if (!notice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">Notice Details</h3>
        <p>
          <strong>Title:</strong> {notice.title}
        </p>
        <p>
          <strong>Date:</strong> {notice.date}
        </p>
        <p>
          <strong>Content:</strong> {notice.content}
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
