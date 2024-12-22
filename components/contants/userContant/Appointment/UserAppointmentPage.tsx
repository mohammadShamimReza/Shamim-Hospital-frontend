import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteAppointmentMutation,
  useGetAllAppointmentByUserQuery,
} from "@/redux/api/appointment";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Select from "react-select";

import { LoadingSpinner } from "@/components/ui/loading";
import { Appointment } from "@/type/Index";
import { toast } from "sonner";
const TodayAppointments = () => {
  const UserInfo = useAppSelector((state) => state.auth.userInfo);

  const id = UserInfo.id;

  const { data: appointments, isLoading } = useGetAllAppointmentByUserQuery({
    id: id,
  });

  console.log(appointments);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const handleDeletePrescription = async (id: number) => {
    console.log(id);
    try {
      const result = await deleteAppointment(id);
      console.log(result);
      toast("Appointment deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPrescriptionPDF = (appointment: Appointment) => {
    const doc = new jsPDF();

    // Title: Hospital Name and Address
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Shamim Hospital Management", 10, 10);
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text("123 Health Avenue, City Name, Country", 10, 20);

    // Subtitle: Prescription Details
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Prescription Details", 10, 35);

    // Casual Info
    doc.setFontSize(12);
    doc.text(
      `Doctor: Dr. ${appointment.doctor.name} (${appointment.doctor.designation})`,
      10,
      45
    );
    doc.text(`Patient: ${appointment.patient.name}`, 10, 55);
    doc.text(
      `Appointment Date: ${format(
        new Date(appointment.appointmentDate),
        "PPP p"
      )}`,
      10,
      65
    );

    // Prescription Section
    doc.setFontSize(12);
    doc.text("Prescription:", 10, 75);
    doc.text(appointment.prescription || "No prescription available", 10, 85);

    // Lab Appointments Table
    if (appointment.LabAppointment.length > 0) {
      const nextY = doc.lastAutoTable?.finalY || 95;
      doc.text("Lab Appointments:", 10, nextY + 10);
      autoTable(doc, {
        startY: nextY + 15,
        head: [["ID", "Test Name", "Price"]],
        body: appointment.LabAppointment.map((lab, index) => [
          index + 1,
          lab.laboratory?.testName || "N/A",
          `$${lab.laboratory?.price || "N/A"}`,
        ]),
      });
    }

    // Diagnostic Appointments Table
    if (appointment.DiagnosticAppointment.length > 0) {
      const nextY = doc.lastAutoTable?.finalY || 130;
      doc.text("Diagnostic Appointments:", 10, nextY + 10);
      autoTable(doc, {
        startY: nextY + 15,
        head: [["ID", "Diagnostic Name", "Price"]],
        body: appointment.DiagnosticAppointment.map((diag, index) => [
          index + 1,
          diag.diagnostic?.diagnosticName || "N/A",
          `$${diag.diagnostic?.price || "N/A"}`,
        ]),
      });
    }

    // Pharmacy Table
    if (appointment.Pharmacy.length > 0) {
      const nextY = doc.lastAutoTable?.finalY || 165;
      doc.text("Pharmacy:", 10, nextY + 10);
      autoTable(doc, {
        startY: nextY + 15,
        head: [["Name", "Unit Price"]],
        body: appointment.Pharmacy.map((phar) => [
          phar.pharmacy?.name || "N/A",
          `$${phar.pharmacy?.unitPrice || "N/A"}`,
        ]),
      });
    }

    // Footer Note
    const finalY = doc.lastAutoTable?.finalY || 200;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(
      "Thank you for visiting Shamim Hospital Management.",
      10,
      finalY + 20
    );

    // Save the PDF
    doc.save(`Prescription_${appointment.id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <LoadingSpinner />
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
                            label: `${lab.laboratory?.testName}`,
                          }))}
                          isDisabled
                          value={appointment.LabAppointment.map((lab) => ({
                            value: lab.id,
                            label: `${lab.laboratory?.testName}`,
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
                              label: `${diag.diagnostic?.diagnosticName} `,
                            })
                          )}
                          isDisabled
                          value={appointment.DiagnosticAppointment.map(
                            (diag) => ({
                              value: diag.id,
                              label: `${diag.diagnostic?.diagnosticName}`,
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
                      <div className="mt-4 flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleDownloadPrescriptionPDF(appointment)
                          }
                        >
                          Download Prescription
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const isConfirmed = window.confirm(
                              "Are you sure you want to delete this appointment?"
                            );
                            if (isConfirmed) {
                              handleDeletePrescription(appointment.id);
                            }
                          }}
                        >
                          Delete Appoinment
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
