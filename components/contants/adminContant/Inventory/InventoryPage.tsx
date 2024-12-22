"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateInventoryMutation,
  useDeleteInventoryMutation,
  useGetAllInventoryQuery,
  useUpdateInventoryMutation,
} from "@/redux/api/inventoryApi";
import { Inventory } from "@/schemas/inventorySchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import InventoryDetailModals from "./InventoryDetailsModal";
import InventoryForm from "./InventoryForm";
import InventoryTable from "./InventoryTable";

export default function InventoryPage() {
  const [inventorys, setInventorys] = useState<Inventory[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(
    null
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: inventoryData, isLoading } = useGetAllInventoryQuery();

  const [createInventory, { isLoading: createing }] =
    useCreateInventoryMutation();
  const [updateInventory, { isLoading: updating }] =
    useUpdateInventoryMutation();
  const [deleteInventory, { isLoading: deleting }] =
    useDeleteInventoryMutation();

  if (createing || updating || deleting) {
    toast(createing ? "createing" : updating ? "updating" : "deleting", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }


  useEffect(() => {
    if (inventoryData?.data) setInventorys(inventoryData.data);
  }, [inventoryData]);

  // Add or Update Inventory function
  const handleSaveInventory = async (inventory: Inventory) => {
    console.log(inventory, "before save");
    try {
      if (isEditing && selectedInventory !== null) {
        if (inventory.id) {
          const result = await updateInventory({
            id: inventory.id,
            body: inventory,
          });

          console.log("Inventory Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Inventory updated successfully");
            setIsEditing(false);
            setIsFormVisible(false);
          }
        }
      } else {
        const result = await createInventory(inventory);
        console.log("Inventory Added:", result);
        if (result?.error) {
          toast("something went wrong, please provice correct info", {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else {
          toast("Created successfully");
        }
      }
       setIsFormVisible(false);
       setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (inventory: Inventory) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedInventory(inventory);
  };

  const handleDetailsModal = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedInventory && selectedInventory.id) {
      try {
        const res = await deleteInventory(selectedInventory.id);

        console.log("Inventory Deleted:", res);
        setSelectedInventory(null);

        setIsDeleteModalOpen(false);
      } catch (error) {
        console.log("Error Deleting Nurse:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        {!isFormVisible && (
          <Button
            onClick={() => {
              setIsFormVisible(true);
              setIsEditing(false);
            }}
          >
            Add Inventory
          </Button>
        )}
      </div>

      {isFormVisible && (
        <InventoryForm
          onSubmit={handleSaveInventory}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedInventory(null);
          }}
          initialData={selectedInventory ? selectedInventory : null}
          isEditing={isEditing}
        />
      )}

      <InventoryDetailModals
        isDetailsModalOpen={isDetailsModalOpen}
        inventory={selectedInventory}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedInventory(null);
        }}
      />

      <InventoryTable
        inventorys={inventorys}
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
        onView={handleDetailsModal}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
