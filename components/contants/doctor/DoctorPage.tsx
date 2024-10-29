"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DoctorSearch from "./DoctorSearch";
import DoctorForm from "./DoctorForm";
import DoctorTable from "./DoctorTable";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Doctor } from "@/schemas/doctorSchema";

export default function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  // Add Doctor function
  const addDoctor = (data: Doctor) => {
    console.log("Adding Doctor:", data);
    setDoctors([...doctors, { ...data,}]);
    resetForm();
  };

  // Update Doctor function
  const updateDoctor = (data: Doctor) => {
    console.log("Updating Doctor:", data);
    setDoctors((prev) =>
      prev.map((doc, index) =>
        index === selectedDoctorIndex ? { ...data } : doc
      )
    );
    resetForm();
  };

  // Determine whether to add or update
  const addOrUpdateDoctor = (data: Doctor) => {
    if (isEditing && selectedDoctorIndex !== null) {
      updateDoctor(data);
    } else {
      addDoctor(data);
    }
  };

  const handleEdit = (doctor: Doctor, index: number) => {
    setIsEditing(true);
    setSelectedDoctorIndex(index);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedDoctorIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDoctorIndex !== null) {
      setDoctors(doctors.filter((_, i) => i !== selectedDoctorIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedDoctorIndex(null);
    setIsFormVisible(false);
  };

  const handleEmailSearch = (email: string) => {
    setSearchEmail(email);
    const filtered = doctors.filter((doctor) =>
      doctor.email.toLowerCase().includes(email.toLowerCase())
    );
    setFilteredDoctors(filtered);
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
        <DoctorSearch searchEmail={searchEmail} onSearch={handleEmailSearch} />
      </div>

      {isFormVisible && (
        <DoctorForm
          onSubmit={addOrUpdateDoctor}
          onCancel={resetForm}
          initialData={isEditing ? doctors[selectedDoctorIndex!] : undefined}
          isEditing={isEditing}
        />
      )}

      <DoctorTable
        doctors={searchEmail ? filteredDoctors : doctors}
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
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
