"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StaffForm from "./StaffForm";
import StaffTable from "./StaffTable";
import StaffDetailsModal from "./StaffDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Staff } from "@/schemas/staffSchema";

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaffList, setFilteredStaffList] = useState<Staff[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaffIndex, setSelectedStaffIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isStaffDetailsModalOpen, setIsStaffDetailsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const handleEdit = (staff: Staff, index: number) => {
    setIsEditing(true);
    setSelectedStaffIndex(index);
    setIsFormVisible(true);
  };

  const confirmDelete = () => {
    if (selectedStaffIndex !== null) {
      setStaffList(staffList.filter((_, i) => i !== selectedStaffIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = staffList.filter((staff) =>
      staff.email.toLowerCase().includes(email)
    );
    setFilteredStaffList(filtered);
  };

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsStaffDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Staff</Button>
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      {isFormVisible && (
        <StaffForm
          isEditing={isEditing}
          initialData={
            selectedStaffIndex !== null
              ? staffList[selectedStaffIndex]
              : undefined
          }
          onSave={(staff) => {
            if (isEditing && selectedStaffIndex !== null) {
              setStaffList((prev) =>
                prev.map((item, i) => (i === selectedStaffIndex ? staff : item))
              );
            } else {
              setStaffList([...staffList, { ...staff, id: Date.now() }]);
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

      <StaffTable
        staffList={searchEmail ? filteredStaffList : staffList}
        onEdit={handleEdit}
        onDelete={(index) => {
          setSelectedStaffIndex(index);
          setIsDeleteModalOpen(true);
        }}
        onView={handleViewStaff}
      />

      <StaffDetailsModal
        isOpen={isStaffDetailsModalOpen}
        staff={selectedStaff}
        onClose={() => setIsStaffDetailsModalOpen(false)}
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
