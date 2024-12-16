"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateLaboratoryMutation,
  useDeleteLaboratoryMutation,
  useGetAllLaboratoryQuery,
  useUpdateLaboratoryMutation,
} from "@/redux/api/laboratoryApi";
import { Laboratory } from "@/schemas/laboratorySchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import LaboratoryDetailModals from "./LaboratoryDetailsModal";
import LaboratoryForm from "./LaboratoryForm";
import LaboratoryTable from "./LaboratoryTable";

export default function LaboratoryPage() {
  const [laboratorys, setLaboratorys] = useState<Laboratory[]>([]);
  const [selectedLaboratory, setSelectedLaboratory] =
    useState<Laboratory | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: laboratoryData, isLoading } = useGetAllLaboratoryQuery();

  const [createLaboratory] = useCreateLaboratoryMutation();
  const [updateLaboratory] = useUpdateLaboratoryMutation();
  const [deleteLaboratory] = useDeleteLaboratoryMutation();

  useEffect(() => {
    if (laboratoryData?.data) setLaboratorys(laboratoryData.data);
  }, [laboratoryData]);

  // Add or Update Laboratory function
  const handleSaveLaboratory = async (laboratory: Laboratory) => {
    console.log(laboratory, "before save");
    try {
      if (isEditing && selectedLaboratory !== null) {
        if (laboratory.id) {
          const result = await updateLaboratory({
            id: laboratory.id,
            body: laboratory,
          });

          console.log("Laboratory Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Laboratory updated successfully");
            setIsEditing(false);
            setIsFormVisible(false);
          }
        }
      } else {
        const result = await createLaboratory(laboratory);
        console.log("Laboratory Added:", result);
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
      //  setIsFormVisible(false);
      //  setIsEditing(false);
      //  setSelectedLaboratoryIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (laboratory: Laboratory) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedLaboratory(laboratory);
  };

  const handleDetailsModal = (laboratory: Laboratory) => {
    setSelectedLaboratory(laboratory);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (laboratory: Laboratory) => {
    setSelectedLaboratory(laboratory);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedLaboratory && selectedLaboratory.id) {
      try {
        const res = await deleteLaboratory(selectedLaboratory.id);

        console.log("Laboratory Deleted:", res);
        setSelectedLaboratory(null);

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
            Add Laboratory
          </Button>
        )}
      </div>

      {isFormVisible && (
        <LaboratoryForm
          onSubmit={handleSaveLaboratory}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedLaboratory(null);
          }}
          initialData={selectedLaboratory ? selectedLaboratory : null}
          isEditing={isEditing}
        />
      )}

      <LaboratoryDetailModals
        isDetailsModalOpen={isDetailsModalOpen}
        laboratory={selectedLaboratory}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedLaboratory(null);
        }}
      />

      <LaboratoryTable
        laboratorys={laboratorys}
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
