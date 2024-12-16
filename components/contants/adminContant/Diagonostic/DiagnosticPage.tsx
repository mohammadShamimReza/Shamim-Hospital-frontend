"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateDiagnosticMutation,
  useDeleteDiagnosticMutation,
  useGetAllDiagnosticQuery,
  useUpdateDiagnosticMutation,
} from "@/redux/api/diagnosticApi";
import { Diagnostic } from "@/schemas/diagnosticSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DiagnosticDetailModals from "./DiagnosticDetailsModal";
import DiagnosticForm from "./DiagnosticForm";
import DiagnosticTable from "./DiagnosticTable";

export default function DiagonosticPage() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [selectedDiagnostic, setSelectedDiagnostic] =
    useState<Diagnostic | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: diagnosticData, isLoading } = useGetAllDiagnosticQuery();

  const [createDiagnostic] = useCreateDiagnosticMutation();
  const [updateDiagnostic] = useUpdateDiagnosticMutation();
  const [deleteDiagnostic] = useDeleteDiagnosticMutation();

  useEffect(() => {
    if (diagnosticData?.data) setDiagnostics(diagnosticData.data);
  }, [diagnosticData]);

  // Add or Update Diagnostic function
  const handleSaveDiagnostic = async (diagnostic: Diagnostic) => {
    console.log(diagnostic, "before save");
    try {
      if (isEditing && selectedDiagnostic !== null) {
        if (diagnostic.id) {
          const result = await updateDiagnostic({
            id: diagnostic.id,
            body: diagnostic,
          });

          console.log("Diagnostic Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Diagnostic updated successfully");
            setIsEditing(false);
            setIsFormVisible(false);
          }
        }
      } else {
        const result = await createDiagnostic(diagnostic);
        console.log("Diagnostic Added:", result);
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
      //  setSelectedDiagnosticIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (diagnostic: Diagnostic) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedDiagnostic(diagnostic);
  };

  const handleDetailsModal = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDiagnostic && selectedDiagnostic.id) {
      try {
        const res = await deleteDiagnostic(selectedDiagnostic.id);

        console.log("Diagnostic Deleted:", res);
        setSelectedDiagnostic(null);

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
            Add Diagnostic
          </Button>
        )}
      </div>

      {isFormVisible && (
        <DiagnosticForm
          onSubmit={handleSaveDiagnostic}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedDiagnostic(null);
          }}
          initialData={selectedDiagnostic ? selectedDiagnostic : null}
          isEditing={isEditing}
        />
      )}

      <DiagnosticDetailModals
        isDetailsModalOpen={isDetailsModalOpen}
        diagnostic={selectedDiagnostic}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedDiagnostic(null);
        }}
      />

      <DiagnosticTable
        diagnostics={diagnostics}
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
