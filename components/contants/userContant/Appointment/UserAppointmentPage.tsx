import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllAppointmentByUserQuery } from "@/redux/api/appointment";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Select from "react-select";

import { Appointment } from "@/type/Index";
const TodayAppointments = () => {
  const UserInfo = useAppSelector((state) => state.auth.userInfo);

  const id = UserInfo.id;

  const { data: appointments, isLoading } = useGetAllAppointmentByUserQuery({
    id: id,
  });

  console.log(appointments);

  const handleDownloadPrescriptionPDF = (appointment: Appointment) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Prescription Details", 10, 10);

    // Add Prescription Details
    doc.setFontSize(12);
    doc.text("Prescription:", 10, 20);
    doc.text(appointment.prescription || "No prescription available", 10, 30);

    // Lab Appointments Table
    if (appointment.LabAppointment.length > 0) {
      doc.text("Lab Appointments:", 10, 50);
      autoTable(doc, {
        startY: 55,
        head: [["ID", "Test Name", "Status"]],
        body: appointment.LabAppointment.map((lab) => [
          lab.id,
          lab.laboratory?.testName || "N/A",
          lab.status,
        ]),
      });
    }

    // Diagnostic Appointments Table
    if (appointment.DiagnosticAppointment.length > 0) {
      const nextY = doc.lastAutoTable?.finalY || 70;
      doc.text("Diagnostic Appointments:", 10, nextY + 10);
      autoTable(doc, {
        startY: nextY + 15,
        head: [["ID", "Diagnostic Name", "Status"]],
        body: appointment.DiagnosticAppointment.map((diag) => [
          diag.id,
          diag.diagnostic?.diagnosticName || "N/A",
          diag.status,
        ]),
      });
    }

    // Pharmacy Table
    if (appointment.Pharmacy.length > 0) {
      const nextY = doc.lastAutoTable?.finalY || 100;
      doc.text("Pharmacy:", 10, nextY + 10);
      autoTable(doc, {
        startY: nextY + 15,
        head: [["Name", "Unit Price"]],
        body: appointment.Pharmacy.map((phar) => [
          phar.pharmacy?.name || "N/A",
          phar.pharmacy?.unitPrice || "N/A",
        ]),
      });
    }

    // Save the PDF
    doc.save(`Prescription_${appointment.id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        You have taken {appointments?.data.length} appointments
      </h2>
      <table className="min-w-full shadow-sm rounded-lg border text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Doctor</th>
            <th className="py-2 px-4 border-b">Patient</th>
            <th className="py-2 px-4 border-b">Service</th>
            <th className="py-2 px-4 border-b">Appointment Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
            <th className="py-2 px-4 border-b">Status</th>
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
                    <Button>View Prescription</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Prescription</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      {/* Prescription Text */}
                      <div className="mb-4">
                        <h3 className="text-md font-semibold">Prescription:</h3>
                        {appointment.prescription ? (
                          <p className="p-4 border rounded">
                            {appointment.prescription}
                          </p>
                        ) : (
                          <p className="text-gray-500">
                            No prescription available!!!!
                          </p>
                        )}
                      </div>

                      {/* Lab Appointments */}
                      <div className="mb-4">
                        <h3 className="text-md font-semibold">
                          Lab Appointments:
                        </h3>
                        <Select
                          isMulti
                          options={appointment.LabAppointment.map((lab) => ({
                            value: lab.id,
                            label: `${lab.laboratory?.testName} - Status: ${lab.status}`,
                          }))}
                          isDisabled
                          value={appointment.LabAppointment.map((lab) => ({
                            value: lab.id,
                            label: `${lab.laboratory?.testName} - Status: ${lab.status}`,
                          }))}
                        />
                      </div>

                      {/* Diagnostic Appointments */}
                      <div className="mb-4">
                        <h3 className="text-md font-semibold">
                          Diagnostic Appointments:
                        </h3>
                        <Select
                          isMulti
                          options={appointment.DiagnosticAppointment.map(
                            (diag) => ({
                              value: diag.id,
                              label: `${diag.diagnostic?.diagnosticName} - Status: ${diag.status}`,
                            })
                          )}
                          isDisabled
                          value={appointment.DiagnosticAppointment.map(
                            (diag) => ({
                              value: diag.id,
                              label: `${diag.diagnostic?.diagnosticName} - Status: ${diag.status}`,
                            })
                          )}
                        />
                      </div>

                      {/* Pharmacy */}
                      <div className="mb-4">
                        <h3 className="text-md font-semibold">Pharmacy:</h3>
                        <Select
                          isMulti
                          options={appointment.Pharmacy.map((phar) => ({
                            value: phar.pharmacy?.name,
                            label: ` ${phar.pharmacy?.unitPrice}`,
                          }))}
                          isDisabled
                          value={appointment.Pharmacy.map((phar) => ({
                            value: phar.pharmacy?.name,
                            label: ` ${phar.pharmacy?.name}`,
                          }))}
                        />
                      </div>
                    </div>
                    {appointment.status === "completed" && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleDownloadPrescriptionPDF(appointment)
                          }
                        >
                          Download Prescription
                        </Button>
                      </div>
                    )}
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </td>
              <td className="py-2 px-4 border-b">{appointment?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayAppointments;
