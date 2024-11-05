import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllAppointmentQuery } from "@/redux/api/appointment";
import { format } from "date-fns";
import { useState } from "react";

const TodayAppointments = () => {
  const { data: appointments } = useGetAllAppointmentQuery();

  const [selectedPrescription, setSelectedPrescription] = useState<
    string | null
    >(null);
  
  console.log(appointments)

  return (
    <div className=" rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        You have taken {appointments?.data.length} appointment
      </h2>
      <table className="min-w-full shadow-sm rounded-lg border border-gray-200 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Doctor</th>
            <th className="py-2 px-4 border-b">Patient</th>
            <th className="py-2 px-4 border-b">Service</th>
            <th className="py-2 px-4 border-b">Appointment Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.data?.map((appointment) => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{appointment.doctor.name}</td>
              <td className="py-2 px-4 border-b">{appointment.patient.name}</td>
              <td className="py-2 px-4 border-b">
                {appointment?.Service?.serviceName}
              </td>
              <td className="py-2 px-4 border-b">
                {format(new Date(appointment.appointmentDate), "PPP p")}
              </td>
              <td className="py-2 px-4 border-b">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() =>
                        setSelectedPrescription(
                          appointment.prescription ||
                            "No prescription available"
                        )
                      }
                    >
                      View Prescription
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Prescription</DialogTitle>
                    </DialogHeader>
                    <div className="">
                      {selectedPrescription ? (
                        <p className="p-20 border rounded">{selectedPrescription}</p>
                      ) : (
                        <p className="">
                          No prescription available!!!!
                        </p>
                      )}
                    </div>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayAppointments;
