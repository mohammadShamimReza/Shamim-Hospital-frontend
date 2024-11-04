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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateAppointmentMutation } from "@/redux/api/appointment";
import { useAppSelector } from "@/redux/hooks";

interface UserServicesTableProps {
  setSelectedService: React.Dispatch<React.SetStateAction<Service | null>>;
}

export default function UserServicesTable({
    setSelectedService,
}: UserServicesTableProps) {
    const [date, setDate] = React.useState<Date>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
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
    const UserInfo = useAppSelector(state => state.auth.userInfo);
    
    const [ createAppointment ] = useCreateAppointmentMutation();

    const handleMakeAppointment = async () => {
        const appointmentDate = date || new Date(); // Use selected date or current date
        const appointmentData = {
          doctorId: selectedDoctor?.id,
          serviceId: selectServiceForDoctor?.id,
          appointmentDate,
          patientId: Number(UserInfo.id),
        };
        alert("are you sure you want to book this appointment?");
        try {
            const result = await createAppointment(appointmentData);
            console.log(result, 'making appointment')
            setDate(undefined);
            setSelectedDoctor(null);
            setSelectServiceForDoctor(null);
            setIsDrawerOpen(false);
        } catch (error) {
            console.log(error)
        }
    }
  

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
            <tr key={service.id}>
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

                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
                            {selectedDoctor ? (
                              <th className="py-2 px-4 border-b">Pick date</th>
                            ) : (
                              ""
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {doctorData?.data?.map((doctor: Doctor) => (
                            <tr key={doctor.id}>
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
                                  className={
                                    selectedDoctor === doctor
                                      ? "border-red-50 text-red-600"
                                      : ""
                                  }
                                >
                                  {selectedDoctor === doctor
                                    ? "Selected"
                                    : "Select"}
                                </Button>
                              </td>
                              <td className="py-2 px-4 border-b">
                                {selectedDoctor === doctor && (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[280px] justify-start text-left font-normal",
                                          !date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                          format(date, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <DrawerFooter>
                        <Button
                          onClick={handleMakeAppointment}
                          disabled={!date}
                          className={cn(!date ? "cursor-not-allowed" : "")}
                        >
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
