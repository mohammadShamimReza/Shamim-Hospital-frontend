import React, { useState } from "react";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Doctor } from "@/schemas/doctorSchema";

export default function UserDoctorPage() {
  const { data: doctorData } = useGetAllDoctorQuery();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleDetailsClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Doctors List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Designation</th>
              <th className="py-2 px-4 border-b">Passing Year</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorData?.data?.map((doctor: Doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{doctor.name}</td>
                <td className="py-2 px-4 border-b">{doctor.designation}</td>
                <td className="py-2 px-4 border-b">{doctor.passingYear}</td>
                <td className="py-2 px-4 border-b">
                  <Button
                    onClick={() => handleDetailsClick(doctor)}
                    className="px-3 py-1 rounded-md"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDoctor && (
        <Modal isOpen={!!selectedDoctor} onClose={handleCloseModal}>
          <h3 className="text-lg font-semibold mb-4">Doctor Details</h3>
          <p>
            <strong>Name:</strong> {selectedDoctor.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedDoctor.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedDoctor.phone}
          </p>
          <p>
            <strong>Address:</strong> {selectedDoctor.address}
          </p>
          <p>
            <strong>Role:</strong> {selectedDoctor.role}
          </p>
          <p>
            <strong>Designation:</strong> {selectedDoctor.designation}
          </p>
          <p>
            <strong>Passing Year:</strong> {selectedDoctor.passingYear}
          </p>
          <Button
            onClick={handleCloseModal}
            className="mt-4 px-4 py-2 rounded-md"
          >
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
}
