import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Service } from "@/schemas/serviceSchema";
import UserServicesTable from "./UserServicesTable";

export default function UserServicePage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

 
  const handleCloseModal = () => {
    setSelectedService(null);
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 ">Service List</h2>

      <div className="overflow-x-auto">
        <UserServicesTable setSelectedService={setSelectedService} />
      </div>

      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={handleCloseModal}>
          <h3 className="text-lg font-semibold mb-4 ">Service Details</h3>
          <div className="space-y-2">
            <p>
              <strong>Service Name:</strong> {selectedService.serviceName}
            </p>
            <p>
              <strong>Description:</strong> {selectedService.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedService.price}
            </p>
            <p>
              <strong>Service Type:</strong> {selectedService.serviceType}
            </p>
            <p>
              <strong>Body Part:</strong> {selectedService.bodyPart}
            </p>
          </div>
          <Button
            onClick={handleCloseModal}
            className="mt-4 px-4 py-2 rounded-md"
          >
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
}
