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

// Define doctor schema using Zod
const doctorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  designation: z.string().optional(),
  passingYear: z.string().optional(),
  workplace: z.string().optional(),
});

type Doctor = z.infer<typeof doctorSchema> & { id?: number };

export default function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const methods = useForm<Doctor>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      designation: "",
      passingYear: "",
      workplace: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Doctor) => {
    if (isEditing && selectedDoctorIndex !== null) {
      setDoctors((prev) =>
        prev.map((doc, index) =>
          index === selectedDoctorIndex ? { ...data, id: doc.id } : doc
        )
      );
    } else {
      setDoctors([...doctors, { ...data, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (doctor: Doctor, index: number) => {
    setIsEditing(true);
    setSelectedDoctorIndex(index);
    reset(doctor);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedDoctorIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDoctorIndex !== null) {
      setDoctors(doctors.filter((_, i) => i !== selectedDoctorIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setSelectedDoctorIndex(null);
    setIsFormVisible(false);
  };

  // Filter doctors based on email search input
  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = doctors.filter((doctor) =>
      doctor.email.toLowerCase().includes(email)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="p-6">
      {/* Add Doctor and Email Search */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            reset();
          }}
        >
          Add Doctor
        </Button>
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      {/* Add/Edit Doctor Form */}
      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Doctor" : "Add New Doctor"}
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
                        <Input placeholder="Doctor's Name" {...field} />
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
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="Designation" {...field} />
                      </FormControl>
                      <FormMessage>{errors.designation?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="passingYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passing Year</FormLabel>
                      <FormControl>
                        <Input placeholder="Passing Year" {...field} />
                      </FormControl>
                      <FormMessage>{errors.passingYear?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="workplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workplace / Institute</FormLabel>
                      <FormControl>
                        <Input placeholder="Workplace / Institute" {...field} />
                      </FormControl>
                      <FormMessage>{errors.workplace?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">
                    {isEditing ? "Update Doctor" : "Add Doctor"}
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

      {/* Doctors Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchEmail ? filteredDoctors : doctors).map((doctor, index) => (
            <TableRow key={index}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>{doctor.designation}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(doctor, index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteModal(index)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>
              Type &quot;DELETE&quot; to confirm the deletion of this doctor.
            </p>
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
