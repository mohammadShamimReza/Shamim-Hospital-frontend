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

// Define notice schema using Zod
const noticeSchema = z.object({
  title: z.string().min(2, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  date: z.string().optional(),
});

type Notice = z.infer<typeof noticeSchema> & { id?: number };

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [isNoticeDetailsModalOpen, setIsNoticeDetailsModalOpen] =
    useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const methods = useForm<Notice>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0], // Defaults to today
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Notice) => {
    if (isEditing && selectedNoticeIndex !== null) {
      setNotices((prev) =>
        prev.map((notice, index) =>
          index === selectedNoticeIndex ? { ...data, id: notice.id } : notice
        )
      );
    } else {
      setNotices([...notices, { ...data, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (notice: Notice, index: number) => {
    setIsEditing(true);
    setSelectedNoticeIndex(index);
    reset(notice);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedNoticeIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNoticeIndex !== null) {
      setNotices(notices.filter((_, i) => i !== selectedNoticeIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setSelectedNoticeIndex(null);
    setIsFormVisible(false);
  };

  // Filter notices based on title search input
  const handleTitleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.toLowerCase();
    setSearchTitle(title);
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(title)
    );
    setFilteredNotices(filtered);
  };

  // Open the notice details modal
  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsNoticeDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Add Notice and Title Search */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
            reset();
          }}
        >
          Add Notice
        </Button>
        <Input
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleTitleSearch}
          className="w-1/2"
        />
      </div>

      {/* Add/Edit Notice Form */}
      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Notice" : "Add New Notice"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Notice Title" {...field} />
                      </FormControl>
                      <FormMessage>{errors.title?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Input placeholder="Notice Content" {...field} />
                      </FormControl>
                      <FormMessage>{errors.content?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage>{errors.date?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">
                    {isEditing ? "Update Notice" : "Add Notice"}
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

      {/* Notices Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchTitle ? filteredNotices : notices).map((notice, index) => (
            <TableRow
              key={index}
              onClick={() => handleViewNotice(notice)}
              className="cursor-pointer"
            >
              <TableCell>{notice.title}</TableCell>
              <TableCell>{notice.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(notice, index);
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

      {/* Notice Details Modal */}
      {isNoticeDetailsModalOpen && selectedNotice && (
        <Modal
          isOpen={isNoticeDetailsModalOpen}
          onClose={() => setIsNoticeDetailsModalOpen(false)}
        >
          <ModalContent>
            <h3 className="text-lg font-semibold mb-4">Notice Details</h3>
            <p>
              <strong>Title:</strong> {selectedNotice.title}
            </p>
            <p>
              <strong>Date:</strong> {selectedNotice.date}
            </p>
            <p>
              <strong>Content:</strong> {selectedNotice.content}
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsNoticeDetailsModalOpen(false)}
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
            <p>Type &quot;DELETE&quot; to confirm the deletion of this notice.</p>
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
