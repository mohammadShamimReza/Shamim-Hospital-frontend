"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Lee",
    specialty: "Cardiology",
    appointmentDate: "2024-10-29",
    appointmentTime: "10:00 AM",
    prescription: "Take 1 tablet of Aspirin daily for 30 days",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Brown",
    specialty: "Dermatology",
    appointmentDate: "2024-11-05",
    appointmentTime: "2:30 PM",
    prescription: "Apply skin ointment twice daily",
  },
  {
    id: 3,
    doctorName: "Dr. Emma Watson",
    specialty: "Pediatrics",
    appointmentDate: "2024-11-10",
    appointmentTime: "9:00 AM",
    prescription: "Multivitamin syrup, 1 tsp daily",
  },
];

export default function UserAppointmentsPage() {
  const [appointments] = useState(mockAppointments);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    (typeof mockAppointments)[0] | null
  >(null);

  // Open the appointment details modal
  const handleViewDetails = (appointment: (typeof mockAppointments)[0]) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Appointments Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.specialty}</TableCell>
                  <TableCell>{appointment.appointmentDate}</TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(appointment)}
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
              <strong>Doctor:</strong> {selectedAppointment.doctorName}
            </p>
            <p>
              <strong>Specialty:</strong> {selectedAppointment.specialty}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.appointmentDate}
            </p>
            <p>
              <strong>Time:</strong> {selectedAppointment.appointmentTime}
            </p>
            <p>
              <strong>Prescription:</strong> {selectedAppointment.prescription}
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
