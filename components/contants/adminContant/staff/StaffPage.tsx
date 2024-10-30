"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import StaffForm from "./StaffForm";
import StaffTable from "./StaffTable";
import { Staff } from "@/schemas/staffSchema";
import {
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetAllStaffQuery,
  useUpdateStaffMutation,
} from "@/redux/api/staffApi"; // Adjust to match Staff API endpoints
import StaffDetailsModal from "./StaffDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "sonner";

export default function StaffPage() {
  const [formState, setFormState] = useState({
    isFormVisible: false,
    isEditing: false,
    selectedStaff: null as Staff | null,
  });
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [modals, setModals] = useState({
    delete: false,
    staffDetails: false,
  });

  const { data: staffData } = useGetAllStaffQuery();
  const [createStaff] = useCreateStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();

  useEffect(() => {
    if (staffData?.data) setStaffList(staffData.data);
  }, [staffData]);

  const toggleFormVisibility = useCallback(
    (isVisible: boolean, isEditing = false, staff: Staff | null = null) => {
      setFormState({
        isFormVisible: isVisible,
        isEditing,
        selectedStaff: staff,
      });
    },
    []
  );

  const handleSaveStaff = async (staff: Staff) => {
    try {
      if (formState.isEditing && formState.selectedStaff) {
        if (staff.id) {
          const result = await updateStaff({ id: staff.id, body: staff });
          console.log("Staff Updated:", result);
        }
      } else {
        const result = await createStaff(staff);
        console.log("Staff Added:", result);
        setStaffList((prev) => [...prev, staff]);
      }
      toggleFormVisibility(false);
    } catch (error) {
      console.log("Error Saving Staff:", error);
      toast("Error saving staff.", {
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  const confirmDelete = async () => {
    if (formState.selectedStaff && formState.selectedStaff.id) {
      try {
        await deleteStaff(formState.selectedStaff.id);
        setStaffList((prev) =>
          prev.filter((staff) => staff.id !== formState.selectedStaff?.id)
        );
        console.log("Staff Deleted:", formState.selectedStaff.id);
        setModals((prev) => ({ ...prev, delete: false }));
      } catch (error) {
        console.log("Error Deleting Staff:", error);
        toast("Error deleting staff.", {
          style: { backgroundColor: "red", color: "white" },
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => toggleFormVisibility(true)}>Add Staff</Button>
      </div>

      {formState.isFormVisible && (
        <StaffForm
          isEditing={formState.isEditing}
          initialData={formState.selectedStaff ?? undefined}
          onSave={handleSaveStaff}
          onCancel={() => toggleFormVisibility(false)}
        />
      )}

      <StaffDetailsModal
        isOpen={modals.staffDetails}
        staff={formState.selectedStaff}
        onClose={() => setModals((prev) => ({ ...prev, staffDetails: false }))}
      />

      <StaffTable
        staffList={staffList}
        onEdit={(staff) => toggleFormVisibility(true, true, staff)}
        onDelete={(staff) => {
          setFormState((prev) => ({ ...prev, selectedStaff: staff }));
          setModals((prev) => ({ ...prev, delete: true }));
        }}
        onView={(staff) => {
          setFormState((prev) => ({ ...prev, selectedStaff: staff }));
          setModals((prev) => ({ ...prev, staffDetails: true }));
        }}
      />

      <DeleteConfirmationModal
        isOpen={modals.delete}
        onClose={() => setModals((prev) => ({ ...prev, delete: false }))}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
