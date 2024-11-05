"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
import { Service } from "@/schemas/serviceSchema";
import ServiceDeleteConfirmationModal from "./ServiceDeleteConfirmationModal";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { useCreateServiceMutation, useDeleteServiceMutation, useGetAllServiceQuery, useUpdateServiceMutation } from "@/redux/api/serviceApi";
import { toast } from "sonner";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const [serviceName, setServicesName] = useState("");

  const { data: serviceData, isLoading } = useGetAllServiceQuery();

const filteredServices = services.filter((service) =>
  service.serviceName.toLowerCase().includes(serviceName.toLowerCase())
);
  console.log(filteredServices, 'Filtered Services');
  console.log(serviceName, 'Service Name');
    const [createService] = useCreateServiceMutation();
    const [updateService] = useUpdateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();

    useEffect(() => {
      if (serviceData?.data) setServices(serviceData.data);
    }, [serviceData]);

  const handleSaveService = async (service: Service) => {
    try {
      if (isEditing && selectedService !== null) {
        if (service.id) {
         const result = await updateService({ id: service.id, body: service });
         if (result?.error) {
           toast("something went wrong", {
             style: {
               backgroundColor: "red",
               color: "white",
             },
           });
         } else {
           toast("Updated successfully");

           setIsEditing(false);
           setIsFormVisible(false);
         }
        }
      } else {
        const result = await createService(service);
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
        setIsFormVisible(false);
        console.log("Service Added:", result);
      }
      //  setIsFormVisible(false);
      //  setIsEditing(false);
      //  setSelectedDoctorIndex(null);
    } catch (error) {
      console.log(error);
    }
  };


   const handleEdit = (service: Service) => {
     setIsEditing(true);
     setIsFormVisible(true);
     setSelectedService(service);
   };

   const handleDetailsModal = (service: Service) => {
     setSelectedService(service);
     setIsDetailsModalOpen(true);
   };

   const handleDeleteModal = (service: Service) => {
     setSelectedService(service);
     setIsDeleteModalOpen(true);
   };

    const confirmDelete = async () => {
      if (selectedService && selectedService.id) {
        try {
           await deleteService(selectedService.id);

          setSelectedService(null);

          setIsDeleteModalOpen(false);
        } catch (error) {
          console.log("Error Deleting Nurse:", error);
        }
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
          Add Service
        </Button>
        <Input
          placeholder="Search services"
          className="w-1/2"
          value={serviceName}
          onChange={(e) => setServicesName(e.target.value)} // Update search term
        />
      </div>

      {isFormVisible && (
        <ServiceForm
          onSubmit={handleSaveService}
          onCancel={() => setIsFormVisible(false)}
          initialData={selectedService ? selectedService : null}
          isEditing={isEditing}
        />
      )}

      <ServiceDetailsModal
        isDetailsModalOpen={isDetailsModalOpen}
        service={selectedService}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <ServiceTable
        services={filteredServices} // Pass filtered services to the table
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
        onView={handleDetailsModal}
        isLoading={isLoading} 
      />

      <ServiceDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
