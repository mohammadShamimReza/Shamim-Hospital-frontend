"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { Service } from "@/schemas/serviceSchema";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isServiceDetailsModalOpen, setIsServiceDetailsModalOpen] =
    useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const handleEdit = (service: Service, index: number) => {
    setIsEditing(true);
    setSelectedServiceIndex(index);
    setIsFormVisible(true);
  };

  const confirmDelete = () => {
    if (selectedServiceIndex !== null) {
      setServices(services.filter((_, i) => i !== selectedServiceIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = services.filter((service) =>
      service.serviceName.toLowerCase().includes(term)
    );
    setFilteredServices(filtered);
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setIsServiceDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Service</Button>
        <Input
          placeholder="Search services"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2"
        />
      </div>

      {isFormVisible && (
        <ServiceForm
          isEditing={isEditing}
          initialData={
            selectedServiceIndex !== null
              ? services[selectedServiceIndex]
              : undefined
          }
          onSave={(service) => {
            if (isEditing && selectedServiceIndex !== null) {
              setServices((prev) =>
                prev.map((item, i) =>
                  i === selectedServiceIndex ? service : item
                )
              );
            } else {
              setServices([...services, { ...service, id: Date.now() }]);
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

      <ServiceTable
        serviceList={searchTerm ? filteredServices : services}
        onEdit={handleEdit}
        onDelete={(index) => {
          setSelectedServiceIndex(index);
          setIsDeleteModalOpen(true);
        }}
        onView={handleViewService}
      />

      <ServiceDetailsModal
        isOpen={isServiceDetailsModalOpen}
        service={selectedService}
        onClose={() => setIsServiceDetailsModalOpen(false)}
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
