"use client";

import { Button } from "@/components/ui/button";
import {
  useCreatePharmacyMutation,
  useDeletePharmacyMutation,
  useGetAllPharmacyQuery,
  useUpdatePharmacyMutation,
} from "@/redux/api/pharmacyApi";
import { Pharmacy } from "@/schemas/pharmacySchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import PharmacyDetailModals from "./PharmacyDetailsModal";
import PharmacyForm from "./PharmacyForm";
import PharmacyTable from "./PharmacyTable";

export default function PharmacyPage() {
  const [pharmacys, setPharmacys] = useState<Pharmacy[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: pharmacyData, isLoading } = useGetAllPharmacyQuery();

  console.log(pharmacyData, "this is pharmacy data");

  const [createPharmacy, { isLoading: createing }] =
    useCreatePharmacyMutation();
  const [updatePharmacy, { isLoading: updating }] = useUpdatePharmacyMutation();
  const [deletePharmacy, { isLoading: deleting }] = useDeletePharmacyMutation();

  if (createing || updating || deleting) {
    toast(createing ? "createing" : updating ? "updating" : "deleting", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }

  useEffect(() => {
    if (pharmacyData?.data) setPharmacys(pharmacyData.data);
  }, [pharmacyData]);

  // Add or Update Pharmacy function
  const handleSavePharmacy = async (pharmacy: Pharmacy) => {
    console.log(pharmacy, "before save");
    try {
      if (isEditing && selectedPharmacy !== null) {
        if (pharmacy.id) {
          const result = await updatePharmacy({
            id: pharmacy.id,
            body: pharmacy,
          });

          console.log("Pharmacy Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Pharmacy updated successfully");
            setIsEditing(false);
            setIsFormVisible(false);
          }
        }
      } else {
        const result = await createPharmacy(pharmacy);
        console.log("Pharmacy Added:", result);
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
       setIsFormVisible(false);
       setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (pharmacy: Pharmacy) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedPharmacy(pharmacy);
  };

  const handleDetailsModal = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPharmacy && selectedPharmacy.id) {
      try {
        const res = await deletePharmacy(selectedPharmacy.id);

        console.log("Pharmacy Deleted:", res);
        setSelectedPharmacy(null);

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
            Add Pharmacy
          </Button>
        )}
      </div>

      {isFormVisible && (
        <PharmacyForm
          onSubmit={handleSavePharmacy}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedPharmacy(null);
          }}
          initialData={selectedPharmacy ? selectedPharmacy : null}
          isEditing={isEditing}
        />
      )}

      <PharmacyDetailModals
        isDetailsModalOpen={isDetailsModalOpen}
        pharmacy={selectedPharmacy}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedPharmacy(null);
        }}
      />

      <PharmacyTable
        pharmacys={pharmacys}
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
