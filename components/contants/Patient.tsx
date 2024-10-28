"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal, ModalContent, ModalFooter } from "../ui/modal";

// Define patient schema using Zod
const patientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  age: z.string().optional(),
  medicalHistory: z.string().optional(),
});

type Patient = z.infer<typeof patientSchema> & { id?: number };

export default function PatientPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<
    number | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] =
    useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const methods = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      age: "",
      medicalHistory: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Patient) => {
    if (isEditing && selectedPatientIndex !== null) {
      setPatients((prev) =>
        prev.map((patient, index) =>
          index === selectedPatientIndex ? { ...data, id: patient.id } : patient
        )
      );
    } else {
      setPatients([...patients, { ...data, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (patient: Patient, index: number) => {
    setIsEditing(true);
    setSelectedPatientIndex(index);
    reset(patient);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedPatientIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPatientIndex !== null) {
      setPatients(patients.filter((_, i) => i !== selectedPatientIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setSelectedPatientIndex(null);
    setIsFormVisible(false);
  };

  // Filter patients based on email search input
  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = patients.filter((patient) =>
      patient.email.toLowerCase().includes(email)
    );
    setFilteredPatients(filtered);
  };

  // Open the patient details modal
  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Add Patient and Email Search */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            reset();
          }}
        >
          Add Patient
        </Button>
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      {/* Add/Edit Patient Form */}
      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Patient" : "Add New Patient"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Patient's Name" {...field} />
                      </FormControl>
                      <FormMessage>{errors.name?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage>{errors.phone?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage>{errors.address?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage>{errors.age?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical History</FormLabel>
                      <FormControl>
                        <Input placeholder="Medical History" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errors.medicalHistory?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">
                    {isEditing ? "Update Patient" : "Add Patient"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      )}

      {/* Patients Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchEmail ? filteredPatients : patients).map((patient, index) => (
            <TableRow
              key={index}
              onClick={() => handleViewPatient(patient)}
              className="cursor-pointer"
            >
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(patient, index);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModal(index);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Patient Details Modal */}
      {isPatientDetailsModalOpen && selectedPatient && (
        <Modal
          isOpen={isPatientDetailsModalOpen}
          onClose={() => setIsPatientDetailsModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Patient Details</h3>
            <p>
              <strong>Name:</strong> {selectedPatient.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedPatient.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPatient.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedPatient.address || "N/A"}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.age || "N/A"}
            </p>
            <p>
              <strong>Medical History:</strong>{" "}
              {selectedPatient.medicalHistory || "N/A"}
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsPatientDetailsModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Type &quot;DELETE&quot; to confirm the deletion of this patient.</p>
            <Input
              placeholder="Type DELETE to confirm"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="my-4"
            />
            <ModalFooter>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteConfirmation !== "DELETE"}
              >
                Confirm Delete
              </Button>
              <Button variant="outline" onClick={closeDeleteModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
