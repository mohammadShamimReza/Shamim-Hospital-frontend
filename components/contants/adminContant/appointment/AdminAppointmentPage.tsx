import { useGetAllAppointmentQuery } from "@/redux/api/appointment";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";

const AdminAppointmentPage = () => {
  const UserInfo = useAppSelector((state) => state.auth.userInfo);
  const { data: appointments, isLoading } = useGetAllAppointmentQuery();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-4">
          <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
        </div>
      );
    }

  return (
    <div className=" rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Appointments</h2>

      {appointments?.data?.length ? (
        <table className="min-w-full shadow-sm rounded-lg border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Doctor</th>
              <th className="py-2 px-4 border-b">Patient</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.data.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b">{UserInfo.name || "N/A"}</td>
                <td className="py-2 px-4 border-b">
                  {appointment.patient.name}
                </td>
                <td className="py-2 px-4 border-b">
                  {appointment.Service.serviceName}
                </td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(appointment.appointmentDate), "PPP p")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No appointments available</p>
      )}
    </div>
  );
};

export default AdminAppointmentPage;
