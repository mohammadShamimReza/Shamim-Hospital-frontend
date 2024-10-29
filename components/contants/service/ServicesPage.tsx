"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
import { Service } from "@/schemas/serviceSchema";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);

  const handleSave = (service: Service) => {
    console.log("Form Data:", service); // Log form data on create or update
    if (isEditing && selectedServiceIndex !== null) {
      setServices((prev) =>
        prev.map((item, i) => (i === selectedServiceIndex ? service : item))
      );
    } else {
      setServices([...services, service]);
    }
    setIsFormVisible(false);
    setIsEditing(false);
    setSelectedServiceIndex(null);
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
        <Input placeholder="Search services" className="w-1/2" />
      </div>

      {isFormVisible && (
        <ServiceForm
          isEditing={isEditing}
          initialData={
            isEditing && selectedServiceIndex !== null
              ? services[selectedServiceIndex]
              : undefined // Pass undefined instead of null when adding a new service
          }
          onSave={handleSave}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <ServiceTable serviceList={services} />
    </div>
  );
}
