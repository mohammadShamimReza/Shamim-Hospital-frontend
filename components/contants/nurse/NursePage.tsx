"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Nurse } from "@/schemas/nurseSchema";
import NurseForm from "./NurseForm";
import NurseTable from "./NurseTable";
import NurseDetailsModal from "./NurseDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function NursePage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [filteredNurses, setFilteredNurses] = useState<Nurse[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNurseIndex, setSelectedNurseIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isNurseDetailsModalOpen, setIsNurseDetailsModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const handleEdit = (nurse: Nurse, index: number) => {
    setIsEditing(true);
    setSelectedNurseIndex(index);
    setIsFormVisible(true);
  };

  const confirmDelete = () => {
    if (selectedNurseIndex !== null) {
      setNurses(nurses.filter((_, i) => i !== selectedNurseIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = nurses.filter((nurse) =>
      nurse.email.toLowerCase().includes(email)
    );
    setFilteredNurses(filtered);
  };

  const handleViewNurse = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setIsNurseDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Nurse</Button>
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      {isFormVisible && (
        <NurseForm
          isEditing={isEditing}
          initialData={
            selectedNurseIndex !== null ? nurses[selectedNurseIndex] : undefined
          }
          onSave={(nurse) => {
            if (isEditing && selectedNurseIndex !== null) {
              setNurses((prev) =>
                prev.map((item, i) => (i === selectedNurseIndex ? nurse : item))
              );
            } else {
              setNurses([...nurses, { ...nurse, id: Date.now() }]);
            }
            setIsFormVisible(false);
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <NurseTable
        nurseList={searchEmail ? filteredNurses : nurses}
        onEdit={handleEdit}
        onDelete={(index) => {
          setSelectedNurseIndex(index);
          setIsDeleteModalOpen(true);
        }}
        onView={handleViewNurse}
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
        confirmationText={deleteConfirmation}
        setConfirmationText={setDeleteConfirmation}
      />
    </div>
  );
}
