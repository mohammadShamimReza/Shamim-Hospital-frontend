"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StaffForm from "./StaffForm";
import StaffTable from "./StaffTable";
import StaffDetailsModal from "./StaffDetailsModal";
import { Staff } from "@/schemas/staffSchema";

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaffIndex, setSelectedStaffIndex] = useState<number | null>(
    null
  );
  const [isStaffDetailsModalOpen, setIsStaffDetailsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const handleEdit = (staff: Staff, index: number) => {
    setIsEditing(true);
    setSelectedStaffIndex(index);
    setIsFormVisible(true);
  };

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsStaffDetailsModalOpen(true);
  };

  const handleSave = (staff: Staff) => {
    console.log("Staff Data Submitted:", staff); // Log data for create/update
    if (isEditing && selectedStaffIndex !== null) {
      setStaffList((prev) =>
        prev.map((item, i) => (i === selectedStaffIndex ? staff : item))
      );
    } else {
      setStaffList([...staffList, staff]);
    }
    setIsFormVisible(false);
    setIsEditing(false);
    setSelectedStaffIndex(null);
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
          Add Staff
        </Button>
      </div>

      {isFormVisible && (
        <StaffForm
          isEditing={isEditing}
          initialData={
            selectedStaffIndex !== null
              ? staffList[selectedStaffIndex]
              : undefined
          }
          onSave={handleSave}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <StaffTable
        staffList={staffList}
        onEdit={handleEdit}
        onView={handleViewStaff}
      />

      <StaffDetailsModal
        isOpen={isStaffDetailsModalOpen}
        staff={selectedStaff}
        onClose={() => setIsStaffDetailsModalOpen(false)}
      />
    </div>
  );
}
