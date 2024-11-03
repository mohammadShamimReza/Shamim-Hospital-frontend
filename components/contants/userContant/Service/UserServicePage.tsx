import React, { useState } from "react";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Service } from "@/schemas/serviceSchema";

export default function UserServicePage() {
  const { data: serviceData } = useGetAllServiceQuery();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleDetailsClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Service List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Service Name</th>
              <th className="py-2 px-4 border-b text-center">Service Type</th>
              <th className="py-2 px-4 border-b text-center">Price</th>
              <th className="py-2 px-4 border-b text-center">Body part</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceData?.data?.map((service: Service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-left">
                  {service.serviceName}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {service.serviceType}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  ${service.price}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  ${service.bodyPart}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  <Button
                    onClick={() => handleDetailsClick(service)}
                    className="px-3 py-1 rounded-md"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={handleCloseModal}>
          <h3 className="text-lg font-semibold mb-4 text-center">
            Service Details
          </h3>
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
