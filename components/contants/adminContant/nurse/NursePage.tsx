"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateNurseMutation,
  useDeleteNurseMutation,
  useGetAllNurseQuery,
  useUpdateNurseMutation,
} from "@/redux/api/nurseApi";
import { Nurse } from "@/schemas/nurseSchema";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import NurseDetailsModal from "./NurseDetailsModal";
import NurseForm from "./NurseForm";
import NurseTable from "./NurseTable";

export default function NursePage() {
  const [formState, setFormState] = useState({
    isFormVisible: false,
    isEditing: false,
    selectedNurse: null as Nurse | null,
  });
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [modals, setModals] = useState({
    delete: false,
    nurseDetails: false,
  });

  const { data: nurseData, isLoading } = useGetAllNurseQuery();
  const [createNurse, { isLoading: createing }] = useCreateNurseMutation();
  const [updateNurse, { isLoading: updating }] = useUpdateNurseMutation();
  const [deleteNurse, { isLoading: deleting }] = useDeleteNurseMutation();

  if (createing || updating || deleting) {
    toast(createing ? "createing" : updating ? "updating" : "deleting", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }

  // Effect to load nurses on data fetch
  useEffect(() => {
    if (nurseData?.data) setNurses(nurseData.data);
  }, [nurseData]);

  const toggleFormVisibility = useCallback(
    (isVisible: boolean, isEditing = false, nurse: Nurse | null = null) => {
      setFormState({
        isFormVisible: isVisible,
        isEditing,
        selectedNurse: nurse,
      });
    },
    []
  );

  const handleSaveNurse = async (nurse: Nurse) => {
    try {
      if (formState.isEditing && formState.selectedNurse) {
        if (nurse.id) {
          const result = await updateNurse({ id: nurse.id, body: nurse });
          console.log("Nurse Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Updated successfully");
          }
        }
      } else {
        const result = await createNurse(nurse);
        console.log("Nurse Added:", result);
        setNurses((prev) => [...prev, nurse]);
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
      toggleFormVisibility(false);
      //  setIsFormVisible(false);
      //  setIsEditing(false);
      //  setSelectedPharmacyIndex(null);
    } catch (error) {
      console.log("Error Saving Nurse:", error);
    }
  };

  const confirmDelete = async () => {
    if (formState.selectedNurse && formState.selectedNurse.id) {
      try {
        await deleteNurse(formState.selectedNurse.id);
        setNurses((prev) =>
          prev.filter((nurse) => nurse.id !== formState.selectedNurse?.id)
        );
        console.log("Nurse Deleted:", formState.selectedNurse.id);
        setModals((prev) => ({ ...prev, delete: false }));
      } catch (error) {
        console.log("Error Deleting Nurse:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => toggleFormVisibility(true)}>Add Nurse</Button>
      </div>

      {formState.isFormVisible && (
        <NurseForm
          isEditing={formState.isEditing}
          initialData={formState.selectedNurse ?? undefined}
          onSave={handleSaveNurse}
          onCancel={() => toggleFormVisibility(false)}
        />
      )}

      <NurseDetailsModal
        isOpen={modals.nurseDetails}
        nurse={formState.selectedNurse}
        onClose={() => setModals((prev) => ({ ...prev, nurseDetails: false }))}
      />

      <NurseTable
        nurseList={nurses}
        onEdit={(nurse) => toggleFormVisibility(true, true, nurse)}
        onDelete={(nurse) => {
          setFormState((prev) => ({ ...prev, selectedNurse: nurse }));
          setModals((prev) => ({ ...prev, delete: true }));
        }}
        onView={(nurse) => {
          setFormState((prev) => ({ ...prev, selectedNurse: nurse }));
          setModals((prev) => ({ ...prev, nurseDetails: true }));
        }}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={modals.delete}
        onClose={() => setModals((prev) => ({ ...prev, delete: false }))}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
