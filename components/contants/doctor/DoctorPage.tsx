"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DoctorForm from "./DoctorForm";
import DoctorTable from "./DoctorTable";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Doctor } from "@/schemas/doctorSchema";

export default function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Add or Update Doctor function
  const handleSaveDoctor = (data: Doctor) => {
    console.log(data)
    if (isEditing && selectedDoctorIndex !== null) {
      setDoctors((prev) =>
        prev.map((doc, index) => (index === selectedDoctorIndex ? data : doc))
      );
    } else {
      setDoctors([...doctors, data]);
    }
    setIsFormVisible(false);
    setIsEditing(false);
    setSelectedDoctorIndex(null);
  };

  const handleEdit = (doctor: Doctor, index: number) => {
    setIsEditing(true);
    setSelectedDoctorIndex(index);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedDoctorIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDoctorIndex !== null) {
      setDoctors(doctors.filter((_, i) => i !== selectedDoctorIndex));
      setIsDeleteModalOpen(false);
      setSelectedDoctorIndex(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
          }}
        >
          Add Doctor
        </Button>
      </div>

      {isFormVisible && (
        <DoctorForm
          onSubmit={handleSaveDoctor}
          onCancel={() => setIsFormVisible(false)}
          initialData={isEditing ? doctors[selectedDoctorIndex!] : undefined}
          isEditing={isEditing}
        />
      )}

      <DoctorTable
        doctors={doctors}
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
