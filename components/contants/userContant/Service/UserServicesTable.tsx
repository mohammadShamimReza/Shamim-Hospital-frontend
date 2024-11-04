import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import { Doctor } from "@/schemas/doctorSchema";
import { Service } from "@/schemas/serviceSchema";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface UserServicesTableProps {
  setSelectedService: React.Dispatch<React.SetStateAction<Service | null>>;
}

export default function UserServicesTable({
  setSelectedService,
}: UserServicesTableProps) {
  const [selectServiceForDoctor, setSelectServiceForDoctor] =
    useState<Service | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { data: doctorData } = useGetAllDoctorQuery();
  const { data: serviceData } = useGetAllServiceQuery();

  const handleDetailsClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleBookingService = (service: Service) => {
    setSelectServiceForDoctor(service);
  };

  const handleMakeAppointment = () => {
    const appointmentDate = new Date(); // Set a static or current date for logging purposes

    if (selectedDoctor && selectServiceForDoctor) {
      console.log("Selected Service:", selectServiceForDoctor);
      console.log("Selected Doctor:", selectedDoctor);
      console.log("Appointment Date:", appointmentDate);
    } else {
      console.log("Please select a doctor and a service for the appointment.");
    }
  };

  return (
    <div>
      <table className="min-w-full shadow-md rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Service Name</th>
            <th className="py-2 px-4 border-b">Service Type</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Body Part</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceData?.data?.map((service: Service) => (
            <tr key={service.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{service.serviceName}</td>
              <td className="py-2 px-4 border-b">{service.serviceType}</td>
              <td className="py-2 px-4 border-b">${service.price}</td>
              <td className="py-2 px-4 border-b">{service.bodyPart}</td>
              <td className="py-2 px-4 border-b gap-3 flex">
                <Button
                  onClick={() => handleDetailsClick(service)}
                  className="px-3 py-1 rounded-md"
                >
                  Details
                </Button>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      onClick={() => handleBookingService(service)}
                      className="px-3 py-1 rounded-md"
                    >
                      Book Doctor
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Book a Doctor for Appointment</DrawerTitle>
                      </DrawerHeader>

                      <table className="shadow-md rounded-lg mb-4">
                        <thead>
                          <tr className="text-left">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Designation</th>
                            <th className="py-2 px-4 border-b">Passing Year</th>
                            <th className="py-2 px-4 border-b">Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctorData?.data?.map((doctor: Doctor) => (
                            <tr key={doctor.id} className="hover:bg-gray-50">
                              <td className="py-2 px-4 border-b">
                                {doctor.name}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {doctor.designation}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {doctor.passingYear}
                              </td>
                              <td className="py-2 px-4 border-b">
                                <Button
                                  onClick={() => setSelectedDoctor(doctor)}
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <DrawerFooter>
                        <Button onClick={handleMakeAppointment}>
                          Make Appointment
                        </Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
