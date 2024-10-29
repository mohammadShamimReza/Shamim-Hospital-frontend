"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import NoticeForm from "./NoticeForm";
import NoticeTable from "./NoticeTable";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Notice } from "@/schemas/noticeSchema";

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (notice: Notice, index: number) => {
    setIsEditing(true);
    setSelectedNoticeIndex(index);
    setIsFormVisible(true);
  };

  const handleSaveNotice = (notice: Notice) => {
    if (isEditing && selectedNoticeIndex !== null) {
      setNotices((prev) =>
        prev.map((item, i) => (i === selectedNoticeIndex ? notice : item))
      );
      console.log("Notice Updated:", notice);
    } else {
      setNotices([...notices, { ...notice, id: Date.now() }]);
      console.log("Notice Created:", notice);
    }
    setIsFormVisible(false);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    if (selectedNoticeIndex !== null) {
      setNotices(notices.filter((_, i) => i !== selectedNoticeIndex));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Notice</Button>
      </div>

      {isFormVisible && (
        <NoticeForm
          isEditing={isEditing}
          initialData={
            selectedNoticeIndex !== null
              ? notices[selectedNoticeIndex]
              : undefined
          }
          onSave={handleSaveNotice}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <NoticeTable
        noticeList={notices}
        onEdit={handleEdit}
        onDelete={(index) => {
          setSelectedNoticeIndex(index);
          setIsDeleteModalOpen(true);
        }}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
