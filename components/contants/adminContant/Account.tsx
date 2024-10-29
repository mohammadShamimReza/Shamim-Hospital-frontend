"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

// Define profile schema with Zod
const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  email: z.string().email("Invalid email address"),
});

type Profile = z.infer<typeof profileSchema>;

// Mock data for user
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  address: "123 Main St, Cityville",
  profilePicture: "/default-profile.jpg",
  nextAppointment: {
    doctor: "Dr. Sarah Lee",
    specialty: "Cardiology",
    date: "2024-10-29",
    time: "10:00 AM",
  },
  appointmentHistory: [
    {
      doctor: "Dr. Michael Brown",
      date: "2024-09-20",
      notes: "Follow-up in 6 months",
    },
    { doctor: "Dr. Emma Watson", date: "2024-08-10", notes: "Routine checkup" },
  ],
  medicalHistory: [
    { condition: "Hypertension", date: "2022-03-15" },
    { condition: "Asthma", date: "2020-09-10" },
  ],
  prescriptions: [
    { name: "Aspirin", dosage: "75 mg daily", prescribedBy: "Dr. Sarah Lee" },
    {
      name: "Salbutamol",
      dosage: "Inhaler as needed",
      prescribedBy: "Dr. Emma Watson",
    },
  ],
};

export default function Account() {
  const [user, setUser] = useState(mockUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const formMethods = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      address: user.address,
      email: user.email,
    },
  });

  const { handleSubmit, control, reset } = formMethods;

  const onSubmitProfile = (data: Profile) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...data,
      profilePicture,
    }));
    setIsEditModalOpen(false);
  };

  const openEditProfileModal = () => {
    reset(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 space-y-8 min-h-screen ">
      {/* Profile and Next Appointment */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Summary */}
        <Card className="flex-1">
          <CardHeader className="p-6 border-b ">
            <CardTitle className="text-2xl font-semibold">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6 p-6">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full border "
            />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="">{user.email}</p>
              <p className="">{user.address}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={openEditProfileModal}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Appointment */}
        <Card className="flex-1">
          <CardHeader className="p-6 border-b ">
            <CardTitle className="text-2xl font-semibold">
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {user.nextAppointment ? (
              <div className="space-y-2">
                <p>
                  <strong>Doctor:</strong> {user.nextAppointment.doctor}
                </p>
                <p>
                  <strong>Specialty:</strong> {user.nextAppointment.specialty}
                </p>
                <p>
                  <strong>Date:</strong> {user.nextAppointment.date}
                </p>
                <p>
                  <strong>Time:</strong> {user.nextAppointment.time}
                </p>
              </div>
            ) : (
              <p>No upcoming appointments scheduled.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Appointment History */}
      <Card>
        <CardHeader className="p-6 border-b ">
          <CardTitle className="text-2xl font-semibold">
            Appointment History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {user.appointmentHistory.length > 0 ? (
            user.appointmentHistory.map((appointment, index) => (
              <div key={index} className="border-b pb-4">
                <p>
                  <strong>Doctor:</strong> {appointment.doctor}
                </p>
                <p>
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Notes:</strong> {appointment.notes}
                </p>
              </div>
            ))
          ) : (
            <p>No past appointments.</p>
          )}
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card>
        <CardHeader className="p-6 border-b ">
          <CardTitle className="text-2xl font-semibold">
            Medical History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {user.medicalHistory.length > 0 ? (
            user.medicalHistory.map((record, index) => (
              <div key={index} className="border-b pb-4">
                <p>
                  <strong>Condition:</strong> {record.condition}
                </p>
                <p>
                  <strong>Date Diagnosed:</strong> {record.date}
                </p>
              </div>
            ))
          ) : (
            <p>No medical history records found.</p>
          )}
        </CardContent>
      </Card>

      {/* Prescription Summary */}
      <Card>
        <CardHeader className="p-6 border-b ">
          <CardTitle className="text-2xl font-semibold">
            Prescription Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {user.prescriptions.length > 0 ? (
            user.prescriptions.map((prescription, index) => (
              <div key={index} className="border-b pb-4">
                <p>
                  <strong>Medication:</strong> {prescription.name}
                </p>
                <p>
                  <strong>Dosage:</strong> {prescription.dosage}
                </p>
                <p>
                  <strong>Prescribed By:</strong> {prescription.prescribedBy}
                </p>
              </div>
            ))
          ) : (
            <p>No prescriptions found.</p>
          )}
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit(onSubmitProfile)}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block font-semibold">
                    Name
                  </label>
                  <Input
                    placeholder="Your Name"
                    {...control.register("name")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold">
                    Email
                  </label>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...control.register("email")}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block font-semibold">
                    Address
                  </label>
                  <Textarea
                    placeholder="Address"
                    {...control.register("address")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="profilePicture"
                    className="block font-semibold"
                  >
                    Profile Picture
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) =>
                          setProfilePicture(event.target?.result as string);
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <ModalFooter>
                  <Button type="submit">Save Changes</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
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
