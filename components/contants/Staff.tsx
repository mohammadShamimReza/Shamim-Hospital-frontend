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

// Define staff schema using Zod
const staffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  department: z.string().min(2, "Department is required"),
  role: z.string().min(2, "Role is required"),
  employmentDate: z.string().optional(),
});

type Staff = z.infer<typeof staffSchema> & { id?: number };

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaffList, setFilteredStaffList] = useState<Staff[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaffIndex, setSelectedStaffIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isStaffDetailsModalOpen, setIsStaffDetailsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const methods = useForm<Staff>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      role: "",
      employmentDate: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Staff) => {
    if (isEditing && selectedStaffIndex !== null) {
      setStaffList((prev) =>
        prev.map((staff, index) =>
          index === selectedStaffIndex ? { ...data, id: staff.id } : staff
        )
      );
    } else {
      setStaffList([...staffList, { ...data, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (staff: Staff, index: number) => {
    setIsEditing(true);
    setSelectedStaffIndex(index);
    reset(staff);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedStaffIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStaffIndex !== null) {
      setStaffList(staffList.filter((_, i) => i !== selectedStaffIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setSelectedStaffIndex(null);
    setIsFormVisible(false);
  };

  // Filter staff based on email search input
  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = staffList.filter((staff) =>
      staff.email.toLowerCase().includes(email)
    );
    setFilteredStaffList(filtered);
  };

  // Open the staff details modal
  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsStaffDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Add Staff and Email Search */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            reset();
          }}
        >
          Add Staff
        </Button>
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      {/* Add/Edit Staff Form */}
      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Staff" : "Add New Staff"}</CardTitle>
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
                        <Input placeholder="Staff's Name" {...field} />
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Role" {...field} />
                      </FormControl>
                      <FormMessage>{errors.role?.message}</FormMessage>
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
                    {isEditing ? "Update Staff" : "Add Staff"}
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

      {/* Staff Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchEmail ? filteredStaffList : staffList).map((staff, index) => (
            <TableRow
              key={index}
              onClick={() => handleViewStaff(staff)}
              className="cursor-pointer"
            >
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(staff, index);
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

      {/* Staff Details Modal */}
      {isStaffDetailsModalOpen && selectedStaff && (
        <Modal
          isOpen={isStaffDetailsModalOpen}
          onClose={() => setIsStaffDetailsModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Staff Details</h3>
            <p>
              <strong>Name:</strong> {selectedStaff.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedStaff.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedStaff.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedStaff.address || "N/A"}
            </p>
            <p>
              <strong>Department:</strong> {selectedStaff.department}
            </p>
            <p>
              <strong>Role:</strong> {selectedStaff.role}
            </p>
            <p>
              <strong>Employment Date:</strong>{" "}
              {selectedStaff.employmentDate || "N/A"}
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsStaffDetailsModalOpen(false)}
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
            <p>Type &quot;DELETE&quot; to confirm the deletion of this staff member.</p>
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
