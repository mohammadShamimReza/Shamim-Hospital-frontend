"use client";

import {
  useGetAllAppointmentQuery,
  useUpdateAppointmentMutation,
} from "@/redux/api/appointment";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { useState } from "react";

const AdminAppointmentPage = () => {
  const UserInfo = useAppSelector((state) => state.auth.userInfo);
  const { data: appointments, isLoading } = useGetAllAppointmentQuery();
  const [statusData, setStatusData] = useState<Record<number, string>>({});

  const [updateAppointment] = useUpdateAppointmentMutation();

  // Status colors
  const statusColors = {
    requested: "bg-yellow-500 text-white",
    scheduled: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    cancelled: "bg-red-500 text-white",
  };

  const statusOptions = ["requested", "scheduled", "cancelled"];

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>

      {appointments?.data?.length ? (
        <table className="min-w-full shadow-sm rounded-lg border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Doctor</th>
              <th className="py-2 px-4 border-b">Patient</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Appointment Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.data.map((appointment) => {
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
                  <td className="py-2 px-4 border-b">
                    {format(new Date(appointment.appointmentDate), "PPP p")}
                  </td>
                  <td>
                    <p
                      className={`border-b text-center capitalize  rounded p-1 ${
                        statusColors[
                          currentStatus as keyof typeof statusColors
                        ] || "bg-gray-300"
                      }`}
                    >
                      {currentStatus}
                    </p>
                  </td>
                  {currentStatus === "completed" ? (
                    ""
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
        <p className="text-gray-500 mt-4">No appointments available</p>
      )}
    </div>
  );
};

export default AdminAppointmentPage;
