"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NurseForm from "./NurseForm";
import NurseTable from "./NurseTable";
import { Nurse } from "@/schemas/nurseSchema";
import { useCreateNurseMutation, useGetAllNurseQuery } from "@/redux/api/nurseApi";
import NurseDetailsModal from "./NurseDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function NursePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [isNurseDetailsModalOpen, setIsNurseDetailsModalOpen] = useState(false);
  const [createNurse] = useCreateNurseMutation();

  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  console.log(selectedNurse, 'selectedNurse');

  const handleEdit = (nurse: Nurse) => {
    setIsEditing(true);
    setIsFormVisible(true);
    console.log("Editing Nurse:", nurse);
  };

  const handleSaveNurse = async (nurse: Nurse) => {
    if (isEditing && selectedNurse !== null) {
      console.log("Edited Nurse Data:", nurse);
      // setNurses((prev) =>
      //   prev.map((item, i) => (i === selectedNurse ? nurse : item))
      // );
    } else {
      try {
        const result = await createNurse(nurse);
        console.log("Nurse Added:", result);
        setNurses((prev) => [...prev, nurse]);
      } catch (error) {
        console.log("Error Adding Nurse:", error);
      }
    }
    setIsFormVisible(false);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    // Add delete functionality here if needed
  };

  const { data: nurseData } = useGetAllNurseQuery();

  useEffect(() => {  if (nurseData) {
    setNurses(nurseData.data);
  }})
 

  console.log(selectedNurse, 'selectedNurse');

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Nurse</Button>
      </div>

      {isFormVisible && (
        <NurseForm
          isEditing={isEditing}
          initialData={selectedNurse !== null ? selectedNurse : undefined}
          onSave={handleSaveNurse}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <NurseDetailsModal
        isOpen={isNurseDetailsModalOpen}
        nurse={selectedNurse}
        onClose={() => setIsNurseDetailsModalOpen(false)}
      />

      <NurseTable
        nurseList={nurses ?? []}
        onEdit={(nurse) => {
          setSelectedNurse(nurse);
          handleEdit(nurse);
        }}
        onDelete={() => {
          setIsDeleteModalOpen(true);
        }}
        onView={(nurse) => {
          setSelectedNurse(nurse);
          setIsNurseDetailsModalOpen(true);
        }}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
