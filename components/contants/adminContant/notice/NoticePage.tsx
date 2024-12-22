"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateNoticeMutation,
  useDeleteNoticeMutation,
  useGetAllNoticeQuery,
  useUpdateNoticeMutation,
} from "@/redux/api/noticeApi";
import { Notice } from "@/schemas/noticeSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import NoticeDetailsModal from "./NoticeDetailsModal";
import NoticeForm from "./NoticeForm";
import NoticeTable from "./NoticeTable";

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: noticeData, isLoading } = useGetAllNoticeQuery();

  const [createNotice, { isLoading: createing }] = useCreateNoticeMutation();
  const [updateNotice, { isLoading: updating }] = useUpdateNoticeMutation();
  const [deleteNotice, { isLoading: deleting }] = useDeleteNoticeMutation();

  useEffect(() => {
    if (noticeData?.data) setNotices(noticeData.data);
  }, [noticeData]);

  if (createing || updating || deleting) {
    toast(createing ? "createing" : updating ? "updating" : "deleting", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }

  const handleSaveNotice = async (notice: Notice) => {
    console.log(notice, "before save");
    try {
      if (isEditing && selectedNotice !== null) {
        if (notice.id) {
          const result = await updateNotice({ id: notice.id, body: notice });
          console.log("notice Updated:", result);
          if (result?.error) {
            toast("something went wrong", {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          } else {
            toast("Updated successfully");

            setIsEditing(false);
            setIsFormVisible(false);
          }
        }
      } else {
        const result = await createNotice(notice);
        console.log("notice Added:", result);
        if (result?.error) {
          toast("something went wrong, please provice correct info", {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else {
          toast("Created successfully");
        }
      }
      setIsFormVisible(false);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (notice: Notice) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedNotice(notice);
  };

  const handleDetailsModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (notice: Notice) => {
    console.log(notice);
    setSelectedNotice(notice);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedNotice && selectedNotice.id) {
      try {
        const res = await deleteNotice(selectedNotice.id);

        console.log("Notice Deleted:", res);
        setSelectedNotice(null);

        setIsDeleteModalOpen(false);
      } catch (error) {
        console.log("Error Deleting Nurse:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Notice</Button>
      </div>

      {isFormVisible && (
        <NoticeForm
          onSubmit={handleSaveNotice}
          onCancel={() => setIsFormVisible(false)}
          initialData={selectedNotice ? selectedNotice : null}
          isEditing={isEditing}
        />
      )}

      <NoticeDetailsModal
        isDetailsModalOpen={isDetailsModalOpen}
        notice={selectedNotice}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <NoticeTable
        notices={notices}
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
        onView={handleDetailsModal}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
