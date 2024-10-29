"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { User } from "@/schemas/userSchema";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import UserDetailsModal from "./UserDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const handleEdit = (user: User, index: number) => {
    setSelectedUserIndex(index);
    setIsFormVisible(true);
  };

  const handleDeleteModal = (index: number) => {
    setSelectedUserIndex(index);
    setDeleteConfirmation("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUserIndex !== null) {
      setUsers(users.filter((_, i) => i !== selectedUserIndex));
      setIsDeleteModalOpen(false);
    }
  };

  const resetForm = () => {
    setSelectedUserIndex(null);
    setIsFormVisible(false);
  };

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    setSearchEmail(email);
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(email)
    );
    setFilteredUsers(filtered);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
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
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
        onView={handleViewUser}
      />

      {isFormVisible && (
        <UserForm
          user={selectedUserIndex !== null ? users[selectedUserIndex] : null}
          onSave={(updatedUser) => {
            setUsers((prev) =>
              prev.map((user, i) =>
                i === selectedUserIndex ? updatedUser : user
              )
            );
            resetForm();
          }}
          onCancel={resetForm}
        />
      )}

      <UserDetailsModal
        isOpen={isUserDetailsModalOpen}
        user={selectedUser}
        onClose={() => setIsUserDetailsModalOpen(false)}
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
