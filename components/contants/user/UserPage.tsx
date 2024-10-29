"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { User } from "@/schemas/userSchema";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEdit = (index: number) => {
    setSelectedUserIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = (index: number) => {
    setSelectedUserIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUserIndex !== null) {
      setUsers(users.filter((_, i) => i !== selectedUserIndex));
      closeDeleteModal();
    }
  };

  const resetForm = () => {
    setSelectedUserIndex(null);
    setIsFormVisible(false);
  };

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(email))
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailSearch}
          className="w-1/2"
        />
      </div>

      <UserTable
        users={searchEmail ? filteredUsers : users}
        onEdit={(user, index) => handleEdit(index)}
        onDelete={(index) => handleDelete(index)}
      />

      {isFormVisible && (
        <UserForm
          user={selectedUserIndex !== null ? users[selectedUserIndex] : null}
          onSave={(updatedUser) => {
            if (selectedUserIndex !== null) {
              setUsers((prev) =>
                prev.map((user, i) =>
                  i === selectedUserIndex ? updatedUser : user
                )
              );
              console.log("Updated User:", updatedUser);
            } else {
              setUsers([...users, updatedUser]);
              console.log("New User Created:", updatedUser);
            }
            resetForm();
          }}
          onCancel={resetForm}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
