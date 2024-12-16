import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Inventory } from "@/schemas/inventorySchema";

interface inventoryDetailsModalProps {
  isDetailsModalOpen: boolean;
  inventory: Inventory | null;
  onClose: () => void;
}

export default function InventoryDetailsModal({
  isDetailsModalOpen,
  inventory,
  onClose,
}: inventoryDetailsModalProps) {
  if (!inventory) return null;

  return (
    <Modal isOpen={isDetailsModalOpen} onClose={onClose}>
      <ModalContent>
        <h3 className="text-lg font-semibold mb-4">inventory Details</h3>
        <p>
          <strong>Name:</strong> {inventory.itemName}
        </p>
        <p>
          <strong>Price:</strong> {inventory.price}
        </p>
        <p>
          <strong>PurchesDate:</strong> {inventory.purchaseDate}
        </p>
        <p>
          <strong>Quantity:</strong> {inventory.quantity}
        </p>
        <p>
          <strong>Status:</strong> {inventory.status}
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
