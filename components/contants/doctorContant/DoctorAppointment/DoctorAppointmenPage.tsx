import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateAppointmentMutation } from "@/redux/api/appointment";
import { useGetAllDiagnosticQuery } from "@/redux/api/diagnosticApi";
import { useGetDoctorByIdQuery } from "@/redux/api/doctorApi";
import { useGetAllLaboratoryQuery } from "@/redux/api/laboratoryApi";
import { useGetAllPharmacyQuery } from "@/redux/api/pharmacyApi";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateDiagnosticAppointmentMutation } from "@/redux/api/DiagnosticAppointmentApi";
import { useCreateLaboratoryAppointmentMutation } from "@/redux/api/LabAppointmentApi";
import { useCreatePharmacyAppointmentMutation } from "@/redux/api/PharmacyAppointmentApi";
import { Diagnostic, Laboratory, Pharmacy } from "@/type/Index";
import Select, { MultiValue } from "react-select";

interface Option {
  value: number;
  label: string;
}

const AppointmentsTable = () => {
  const UserInfo = useAppSelector((state) => state.auth.userInfo);
  const { data: appointments, isLoading } = useGetDoctorByIdQuery({
    id: Number(UserInfo.id),
  });
  console.log(appointments, "this is appointments");
  const [statusData, setStatusData] = useState<Record<number, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);
  const [selectedPharmacies, setSelectedPharmacies] = useState<Option[]>([]);
  const [selectedLaboratories, setSelectedLaboratories] = useState<Option[]>(
    []
  );
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<Option[]>([]);

  const { data: pharmacyData } = useGetAllPharmacyQuery();

  const { data: laboratoryData } = useGetAllLaboratoryQuery();

  const { data: diagnosticData } = useGetAllDiagnosticQuery();

  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleOpenPrescriptionDialog = (
    appointmentId: number,
    prescription: string | null
  ) => {
    setSelectedAppointmentId(appointmentId);
    setPrescriptionText(prescription || ""); // Set existing prescription or empty if null
    setIsDialogOpen(true);
  };

  const [createPharmacyOnAppointment] = useCreatePharmacyAppointmentMutation();
  const [createLabAppointment] = useCreateLaboratoryAppointmentMutation();
  const [createDiagnosticAppointment] =
    useCreateDiagnosticAppointmentMutation();

  const handleSubmitPrescription = async () => {
    try {
      const result = await updateAppointment({
        body: { prescription: prescriptionText },
        id: selectedAppointmentId || 1,
      });
      console.log(result, "this is the result of update of appointment");
      if (result?.error) {
        toast("something went wrong", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        toast("successfully");
        setIsDialogOpen(false);
        setPrescriptionText("");
        // window.location.reload();
      }

      const pharmacyRequests = selectedPharmacies.map((pharmacy) =>
        createPharmacyOnAppointment({
          appointmentId: selectedAppointmentId || 0, // The selected appointment ID
          pharmacyId: pharmacy.value, // The selected pharmacy ID
        })
      );

      const labRequests = selectedLaboratories.map((lab) =>
        createLabAppointment({
          appointmentId: selectedAppointmentId || 0,
          laboratoryId: lab.value,
        })
      );

      const diagnosticRequests = selectedDiagnostics.map((diag) =>
        createDiagnosticAppointment({
          appointmentId: selectedAppointmentId || 0,
          diagnosticId: diag.value,
        })
      );

      console.log(pharmacyRequests, labRequests, diagnosticRequests);

      // Execute all requests in parallel
      await Promise.all([
        ...pharmacyRequests,
        ...labRequests,
        ...diagnosticRequests,
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const statusColors = {
    requested: "bg-yellow-500 text-white",
    scheduled: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    cancelled: "bg-red-500 text-white",
  };
  const statusOptions = ["scheduled", "completed"];

  const handleStatusChange = async (
    appointmentId: number,
    newStatus: string
  ) => {
    try {
      const result = await updateAppointment({
        id: appointmentId,
        body: {
          status: newStatus,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    // Update the statusData state for UI purposes
    setStatusData((prevState) => ({
      ...prevState,
      [appointmentId]: newStatus,
    }));

    // Here, you would call the API to update the status
    // Example: updateAppointmentStatus({ id: appointmentId, status: newStatus })
  };
  const mapPharmacyOptions = (data: Pharmacy[] | undefined): Option[] =>
    data?.map((item) => ({ value: item.id, label: item.name })) || [];

  const mapLaboratoryOptions = (data: Laboratory[] | undefined): Option[] =>
    data?.map((item) => ({ value: item.id, label: item.testName })) || [];

  const mapDiagnosticOptions = (data: Diagnostic[] | undefined): Option[] =>
    data?.map((item) => ({ value: item.id, label: item.diagnosticName })) || [];

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<Option[]>>) =>
    (newValue: MultiValue<Option>) => {
      setter(newValue as Option[]);
    };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>

      {appointments?.data?.appointments?.length ? (
        <table className="min-w-full shadow-sm rounded-lg border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Doctor</th>
              <th className="py-2 px-4 border-b">Patient</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Stauts</th>
              <th className="py-2 px-4 border-b">Appointment Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
              <th className="py-2 px-4 border-b">Tag</th>
            </tr>
          </thead>
          <tbody>
            {appointments.data.appointments
              .filter((appointment) => appointment.status === "scheduled")
              .map((appointment) => {
                const currentStatus =
                  statusData[appointment.id] || appointment.status;
                return (
                  <tr key={appointment.id}>
                    <td className="py-2 px-4 border-b">
                      {UserInfo.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {appointment.patient.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {appointment.Service.serviceName}
                    </td>
                    <td
                      className={`border-b text-center capitalize font-semibold rounded ${
                        statusColors[
                          currentStatus as keyof typeof statusColors
                        ] || "bg-gray-300"
                      }`}
                    >
                      {currentStatus}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {format(new Date(appointment.appointmentDate), "PPP p")}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
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
                            <DialogTitle>Prescription</DialogTitle>
                          </DialogHeader>
                          <div>
                            <textarea
                              value={prescriptionText}
                              onChange={(e) =>
                                setPrescriptionText(e.target.value)
                              }
                              className="w-full p-2 border rounded"
                              placeholder="Enter prescription details"
                            ></textarea>
                            <div className="mt-4">
                              <h3 className="font-semibold">Pharmacy</h3>
                              <Select
                                isMulti
                                options={mapPharmacyOptions(pharmacyData?.data)}
                                value={selectedPharmacies}
                                onChange={handleSelectChange(
                                  setSelectedPharmacies
                                )}
                              />

                              <h3 className="font-semibold mt-4">Laboratory</h3>
                              <Select
                                isMulti
                                options={mapLaboratoryOptions(
                                  laboratoryData?.data
                                )}
                                value={selectedLaboratories}
                                onChange={handleSelectChange(
                                  setSelectedLaboratories
                                )}
                              />

                              <h3 className="font-semibold mt-4">Diagnostic</h3>
                              <Select
                                isMulti
                                options={mapDiagnosticOptions(
                                  diagnosticData?.data
                                )}
                                value={selectedDiagnostics}
                                onChange={handleSelectChange(
                                  setSelectedDiagnostics
                                )}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
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
                    </td>
                    {!appointment.prescription ? (
                      "prescribe first"
                    ) : (
                      <td className="py-2 px-4 border-b text-center">
                        {/* Dropdown to change status */}
                        <select
                          value={currentStatus}
                          onChange={(e) =>
                            handleStatusChange(appointment.id, e.target.value)
                          }
                          className="p-2 border rounded bg-gray-50"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No appointment for you</p>
      )}
    </div>
  );
};

export default AppointmentsTable;
