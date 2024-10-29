"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NoticeForm from "./NoticeForm";
import NoticeTable from "./NoticeTable";
import NoticeDetailsModal from "./NoticeDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Notice } from "@/schemas/noticeSchema";

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

  const handleEdit = (notice: Notice, index: number) => {
    setIsEditing(true);
    setSelectedNoticeIndex(index);
    setIsFormVisible(true);
  };

  const confirmDelete = () => {
    if (selectedNoticeIndex !== null) {
      setNotices(notices.filter((_, i) => i !== selectedNoticeIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const handleTitleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.toLowerCase();
    setSearchTitle(title);
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(title)
    );
    setFilteredNotices(filtered);
  };

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsNoticeDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => setIsFormVisible(true)}>Add Notice</Button>
        <Input
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleTitleSearch}
          className="w-1/2"
        />
      </div>

      {isFormVisible && (
        <NoticeForm
          isEditing={isEditing}
          initialData={
            selectedNoticeIndex !== null
              ? notices[selectedNoticeIndex]
              : undefined
          }
          onSave={(notice) => {
            if (isEditing && selectedNoticeIndex !== null) {
              setNotices((prev) =>
                prev.map((item, i) =>
                  i === selectedNoticeIndex ? notice : item
                )
              );
            } else {
              setNotices([...notices, { ...notice, id: Date.now() }]);
            }
            setIsFormVisible(false);
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsFormVisible(false);
            setIsEditing(false);
          }}
        />
      )}

      <NoticeTable
        noticeList={searchTitle ? filteredNotices : notices}
        onEdit={handleEdit}
        onDelete={(index) => {
          setSelectedNoticeIndex(index);
          setIsDeleteModalOpen(true);
        }}
        onView={handleViewNotice}
      />

      <NoticeDetailsModal
        isOpen={isNoticeDetailsModalOpen}
        notice={selectedNotice}
        onClose={() => setIsNoticeDetailsModalOpen(false)}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        confirmationText={deleteConfirmation}
        setConfirmationText={setDeleteConfirmation}
      />
    </div>
  );
}
