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

// Define nurse schema using Zod
const nurseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  department: z.string().min(2, "Department is required"),
  shift: z.string().min(3, "Shift is required"),
  employmentDate: z.string().optional(),
});

type Nurse = z.infer<typeof nurseSchema> & { id?: number };

export default function NursePage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [filteredNurses, setFilteredNurses] = useState<Nurse[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNurseIndex, setSelectedNurseIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isNurseDetailsModalOpen, setIsNurseDetailsModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const methods = useForm<Nurse>({
    resolver: zodResolver(nurseSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      shift: "",
      employmentDate: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Nurse) => {
    if (isEditing && selectedNurseIndex !== null) {
      setNurses((prev) =>
        prev.map((nurse, index) =>
          index === selectedNurseIndex ? { ...data, id: nurse.id } : nurse
        )
      );
    } else {
      setNurses([...nurses, { ...data, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (nurse: Nurse, index: number) => {
    setIsEditing(true);
    setSelectedNurseIndex(index);
    reset(nurse);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedNurseIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNurseIndex !== null) {
      setNurses(nurses.filter((_, i) => i !== selectedNurseIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setSelectedNurseIndex(null);
    setIsFormVisible(false);
  };

  // Filter nurses based on email search input
  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = nurses.filter((nurse) =>
      nurse.email.toLowerCase().includes(email)
    );
    setFilteredNurses(filtered);
  };

  // Open the nurse details modal
  const handleViewNurse = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setIsNurseDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Add Nurse and Email Search */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            reset();
          }}
        >
          Add Nurse
        </Button>
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      {/* Add/Edit Nurse Form */}
      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Nurse" : "Add New Nurse"}</CardTitle>
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
                        <Input placeholder="Nurse's Name" {...field} />
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
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Department" {...field} />
                      </FormControl>
                      <FormMessage>{errors.department?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="shift"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Shift Timing (e.g., Night)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.shift?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="employmentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Employment Date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.employmentDate?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">
                    {isEditing ? "Update Nurse" : "Add Nurse"}
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

      {/* Nurses Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchEmail ? filteredNurses : nurses).map((nurse, index) => (
            <TableRow
              key={index}
              onClick={() => handleViewNurse(nurse)}
              className="cursor-pointer"
            >
              <TableCell>{nurse.name}</TableCell>
              <TableCell>{nurse.email}</TableCell>
              <TableCell>{nurse.phone}</TableCell>
              <TableCell>{nurse.shift}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(nurse, index);
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

      {/* Nurse Details Modal */}
      {isNurseDetailsModalOpen && selectedNurse && (
        <Modal
          isOpen={isNurseDetailsModalOpen}
          onClose={() => setIsNurseDetailsModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Nurse Details</h3>
            <p>
              <strong>Name:</strong> {selectedNurse.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedNurse.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedNurse.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedNurse.address || "N/A"}
            </p>
            <p>
              <strong>Department:</strong> {selectedNurse.department}
            </p>
            <p>
              <strong>Shift:</strong> {selectedNurse.shift}
            </p>
            <p>
              <strong>Employment Date:</strong>{" "}
              {selectedNurse.employmentDate || "N/A"}
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsNurseDetailsModalOpen(false)}
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
            <p>Type &quot;DELETE&quot; to confirm the deletion of this nurse.</p>
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
