"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema for prescription input
const prescriptionSchema = z.object({
  prescription: z.string().min(5, "Prescription must be at least 5 characters"),
});

type Appointment = {
  id: number;
  patientName: string;
  symptoms: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  prescription?: string;
};

const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Alice Johnson",
    symptoms: "Headache, nausea",
    appointmentDate: "2024-10-29",
    appointmentTime: "10:00 AM",
    notes: "Patient reports headache and occasional nausea.",
    prescription: "",
  },
  {
    id: 2,
    patientName: "Bob Smith",
    symptoms: "Fever, sore throat",
    appointmentDate: "2024-11-01",
    appointmentTime: "11:30 AM",
    notes: "Patient has a sore throat and low-grade fever.",
    prescription: "",
  },
];

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: { prescription: "" },
  });

  const { handleSubmit, reset, control } = formMethods;

  // Open modal with appointment details
  const openAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    reset({ prescription: appointment.prescription || "" });
    setIsDetailsModalOpen(true);
  };

  // Handle submitting the prescription form
  const onSubmitPrescription = (data: { prescription: string }) => {
    if (selectedAppointment) {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === selectedAppointment.id
            ? { ...appt, prescription: data.prescription }
            : appt
        )
      );
      setIsDetailsModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      {/* Appointments Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Symptoms</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.symptoms}</TableCell>
                  <TableCell>{appointment.appointmentDate}</TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAppointmentDetails(appointment)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Appointment Details Modal */}
      {isDetailsModalOpen && selectedAppointment && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
            <p>
              <strong>Patient:</strong> {selectedAppointment.patientName}
            </p>
            <p>
              <strong>Symptoms:</strong> {selectedAppointment.symptoms}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.appointmentDate}
            </p>
            <p>
              <strong>Time:</strong> {selectedAppointment.appointmentTime}
            </p>
            <p>
              <strong>Notes:</strong> {selectedAppointment.notes}
            </p>

            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit(onSubmitPrescription)}
                className="mt-6"
              >
                <div className="mb-4">
                  <label htmlFor="prescription" className="block font-semibold">
                    Prescription
                  </label>
                  <Textarea
                    id="prescription"
                    placeholder="Enter prescription"
                    {...control.register("prescription")}
                  />
                </div>
                <ModalFooter>
                  <Button type="submit">
                    Save Prescription
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
