"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import NurseForm from "./NurseForm";
import NurseTable from "./NurseTable";
import NurseDetailsModal from "./NurseDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Nurse } from "@/schemas/nurseSchema";

export default function NursePage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNurseIndex, setSelectedNurseIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNurseDetailsModalOpen, setIsNurseDetailsModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEdit = (nurse: Nurse, index: number) => {
    setIsEditing(true);
    setSelectedNurseIndex(index);
    setIsFormVisible(true);
  };

  const handleSaveNurse = (nurse: Nurse) => {
    if (isEditing && selectedNurseIndex !== null) {
      setNurses((prev) =>
        prev.map((item, i) => (i === selectedNurseIndex ? nurse : item))
      );
      console.log("Nurse Updated:", nurse);
    } else {
      setNurses([...nurses, { ...nurse, id: Date.now() }]);
      console.log("Nurse Created:", nurse);
    }
    setIsFormVisible(false);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    if (selectedNurseIndex !== null) {
      setNurses(nurses.filter((_, i) => i !== selectedNurseIndex));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Nurse</Button>
      </div>

      {isFormVisible && (
        <NurseForm
          isEditing={isEditing}
          initialData={
            selectedNurseIndex !== null ? nurses[selectedNurseIndex] : undefined
          }
          onSave={handleSaveNurse}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <NurseTable
        nurseList={nurses}
        onEdit={handleEdit}
        onDelete={(index) => {
          setSelectedNurseIndex(index);
          setIsDeleteModalOpen(true);
        }}
        onView={(nurse) => {
          setSelectedNurse(nurse);
          setIsNurseDetailsModalOpen(true);
        }}
      />

      <NurseDetailsModal
        isOpen={isNurseDetailsModalOpen}
        nurse={selectedNurse}
        onClose={() => setIsNurseDetailsModalOpen(false)}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
