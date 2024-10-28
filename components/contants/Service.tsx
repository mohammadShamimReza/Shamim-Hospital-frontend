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
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";

// Define service schema using Zod
const serviceSchema = z.object({
  name: z.string().min(2, "Service name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  department: z.string().min(2, "Department is required"),
  status: z.enum(["Available", "Unavailable"]),
  cost: z.number().min(0, "Cost must be a positive number"),
});

type Service = z.infer<typeof serviceSchema> & { id?: number };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isServiceDetailsModalOpen, setIsServiceDetailsModalOpen] =
    useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const methods = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      department: "",
      status: "Available",
      cost: 0,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Service) => {
    if (isEditing && selectedServiceIndex !== null) {
      setServices((prev) =>
        prev.map((service, index) =>
          index === selectedServiceIndex ? { ...data, id: service.id } : service
        )
      );
    } else {
      setServices([...services, { ...data, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (service: Service, index: number) => {
    setIsEditing(true);
    setSelectedServiceIndex(index);
    reset(service);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedServiceIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedServiceIndex !== null) {
      setServices(services.filter((_, i) => i !== selectedServiceIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setSelectedServiceIndex(null);
    setIsFormVisible(false);
  };

  // Filter services based on search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(term)
    );
    setFilteredServices(filtered);
  };

  // Open the service details modal
  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setIsServiceDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Add Service and Search by Name */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            reset();
          }}
        >
          Add Service
        </Button>
        <Input
          placeholder="Search services"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2"
        />
      </div>

      {/* Add/Edit Service Form */}
      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Service" : "Add New Service"}
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
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Service Name" {...field} />
                      </FormControl>
                      <FormMessage>{errors.name?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage>{errors.description?.message}</FormMessage>
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select {...field} className="border rounded-md p-2">
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </FormControl>
                      <FormMessage>{errors.status?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Cost" {...field} />
                      </FormControl>
                      <FormMessage>{errors.cost?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">
                    {isEditing ? "Update Service" : "Add Service"}
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

      {/* Services Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchTerm ? filteredServices : services).map((service, index) => (
            <TableRow
              key={index}
              onClick={() => handleViewService(service)}
              className="cursor-pointer"
            >
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.department}</TableCell>
              <TableCell>{service.status}</TableCell>
              <TableCell>${service.cost}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(service, index);
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

      {/* Service Details Modal */}
      {isServiceDetailsModalOpen && selectedService && (
        <Modal
          isOpen={isServiceDetailsModalOpen}
          onClose={() => setIsServiceDetailsModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
            <p>
              <strong>Name:</strong> {selectedService.name}
            </p>
            <p>
              <strong>Department:</strong> {selectedService.department}
            </p>
            <p>
              <strong>Status:</strong> {selectedService.status}
            </p>
            <p>
              <strong>Cost:</strong> ${selectedService.cost}
            </p>
            <p>
              <strong>Description:</strong> {selectedService.description}
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsServiceDetailsModalOpen(false)}
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
            <p>Type &quot;DELETE&quot; to confirm the deletion of this service.</p>
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
