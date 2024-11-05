import { format, isToday } from "date-fns";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetDoctorByIdQuery } from "@/redux/api/doctorApi";
import { useAppSelector } from "@/redux/hooks";
import { useUpdateAppointmentMutation } from "@/redux/api/appointment";

const AppointmentsTable = () => {
  const UserInfo = useAppSelector((state) => state.auth.userInfo);
  const { data: appointments } = useGetDoctorByIdQuery({
    id: Number(UserInfo.id),
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleOpenPrescriptionDialog = (
    appointmentId: number,
    prescription: string | null
  ) => {
    setSelectedAppointmentId(appointmentId);
    setPrescriptionText(prescription || ""); // Set existing prescription or empty if null
    setIsDialogOpen(true);
  };

  const handleSubmitPrescription = async () => {
    try {
      const result = await updateAppointment({
        body: { prescription: prescriptionText },
        id: selectedAppointmentId || 1,
      });
      console.log(result, "this is the result of update of appointment");
      setIsDialogOpen(false);
      setPrescriptionText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>
      <table className="min-w-full shadow-sm rounded-lg border ">
        <thead>
          <tr >
            <th className="py-2 px-4 border-b">Doctor</th>
            <th className="py-2 px-4 border-b">Patient</th>
            <th className="py-2 px-4 border-b">Service</th>
            <th className="py-2 px-4 border-b">Appointment Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.data?.appointments?.map((appointment) => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{UserInfo.name || "N/A"}</td>
              <td className="py-2 px-4 border-b">{appointment.patient.name}</td>
              <td className="py-2 px-4 border-b">
                {appointment.Service.serviceName}
              </td>
              <td className="py-2 px-4 border-b">
                {format(new Date(appointment.appointmentDate), "PPP p")}
              </td>
              <td className="py-2 px-4 border-b">
                {isToday(new Date(appointment.appointmentDate)) && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() =>
                          handleOpenPrescriptionDialog(
                            appointment.id,
                            appointment.prescription
                          )
                        }
                        className="px-3 py-1 rounded-md"
                      >
                        Prescription
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Prescription</DialogTitle>
                      </DialogHeader>
                      <div className="p-4">
                        <textarea
                          value={prescriptionText}
                          onChange={(e) => setPrescriptionText(e.target.value)}
                          placeholder="Enter prescription details"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-2 p-4">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitPrescription}>
                          Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
