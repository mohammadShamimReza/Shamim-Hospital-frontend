"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import NurseForm from "./NurseForm";
import NurseTable from "./NurseTable";
import { Nurse } from "@/schemas/nurseSchema";
import { useCreateNurseMutation } from "@/redux/api/nurseApi";

export default function NursePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNurseIndex, setSelectedNurseIndex] = useState<number | null>(
    null
  );
  const [createNurse] = useCreateNurseMutation()

  const handleEdit = (nurse: Nurse, index: number) => {
    setIsEditing(true);
    setSelectedNurseIndex(index);
    console.log("Editing Nurse:", nurse);
  };

  const handleSaveNurse =async (nurse: Nurse) => {
    if (isEditing && selectedNurseIndex !== null) {
      console.log("Nurse Updated:", nurse);
    } else {
      try {
        const result = await createNurse( nurse );
        console.log(result)
        console.log("Nurse Added:", result);
      } catch (error) {
        console.log(error)
      }
    }
    setIsFormVisible(false);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Nurse</Button>
      </div>

      {isFormVisible && (
        <NurseForm
          isEditing={isEditing}
       
          onSave={handleSaveNurse}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <NurseTable
        onEdit={handleEdit} onDelete={() => { }} onView={() => { }}
      />
    </div>
  );
}
