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
  const handleBookingService = (service: Service) => {
    console.log(service)
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 ">Service List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b ">Service Name</th>
              <th className="py-2 px-4 border-b ">Service Type</th>
              <th className="py-2 px-4 border-b ">Price</th>
              <th className="py-2 px-4 border-b ">Body part</th>
              <th className="py-2 px-4 border-b ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceData?.data?.map((service: Service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b ">
                  {service.serviceName}
                </td>
                <td className="py-2 px-4 border-b ">
                  {service.serviceType}
                </td>
                <td className="py-2 px-4 border-b ">
                  ${service.price}
                </td>
                <td className="py-2 px-4 border-b ">
                  {service.bodyPart}
                </td>
                <td className="py-2 px-4 border-b  gap-3 flex">
                  <Button
                    onClick={() => handleDetailsClick(service)}
                    className="px-3 py-1 rounded-md"
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() => handleBookingService(service)}
                    className="px-3 py-1 rounded-md"
                  >
                    Book
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={handleCloseModal}>
          <h3 className="text-lg font-semibold mb-4 ">
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
