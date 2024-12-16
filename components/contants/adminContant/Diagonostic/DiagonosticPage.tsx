"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
  useGetAllDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Doctor } from "@/schemas/doctorSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DoctorDetailModals from "./DiagonosticDetailsModal";
import DoctorForm from "./DiagonosticForm";
import DoctorTable from "./DiagonosticTable";

export default function DiagonosticPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: doctorData, isLoading } = useGetAllDoctorQuery();

  const [createDoctor] = useCreateDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();

  useEffect(() => {
    if (doctorData?.data) setDoctors(doctorData.data);
  }, [doctorData]);

  // Add or Update Doctor function
  const handleSaveDoctor = async (doctor: Doctor) => {
    console.log(doctor, "before save");
    try {
      if (isEditing && selectedDoctor !== null) {
        if (doctor.id) {
          const result = await updateDoctor({ id: doctor.id, body: doctor });

          console.log("Doctor Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Doctor updated successfully");
            setIsEditing(false);
            setIsFormVisible(false);
          }
        }
      } else {
        const result = await createDoctor(doctor);
        console.log("Doctor Added:", result);
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
      //  setSelectedDoctorIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedDoctor(doctor);
  };

  const handleDetailsModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDoctor && selectedDoctor.id) {
      try {
        const res = await deleteDoctor(selectedDoctor.id);

        console.log("Doctor Deleted:", res);
        setSelectedDoctor(null);

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
            Add Doctor
          </Button>
        )}
      </div>

      {isFormVisible && (
        <DoctorForm
          onSubmit={handleSaveDoctor}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedDoctor(null);
          }}
          initialData={selectedDoctor ? selectedDoctor : null}
          isEditing={isEditing}
        />
      )}

      <DoctorDetailModals
        isDetailsModalOpen={isDetailsModalOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedDoctor(null);
        }}
      />

      <DoctorTable
        doctors={doctors}
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
