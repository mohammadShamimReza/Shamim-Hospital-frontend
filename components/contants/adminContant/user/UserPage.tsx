"use client";

import { Input } from "@/components/ui/input";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { User } from "@/schemas/userSchema";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UserDetailsModal from "./UserDetailsModal";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: userData, isLoading } = useGetAllUserQuery();

  useEffect(() => {
    if (userData) {
      setUsers(userData.data);
      setFilteredUsers(userData.data);
    }
  }, [userData]);
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormVisible(true);
    handleEditUser(user);
  };
  const [updateUser] = useUpdateUserMutation();

  const handleEditUser = async (user: User) => {
    if (user.id) {
      const result = await updateUser({ id: user.id, body: user });
      console.log("userd Updated:", result);

      setIsFormVisible(true);
    }
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (user: User) => {
    console.log(user);
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser && selectedUser.id) {
      try {
        await deleteUser(selectedUser.id);
        setUsers(users.filter((user) => user.id !== selectedUser?.id));

        setIsDeleteModalOpen(false);
      } catch (error) {
        console.log("Error Deleting Nurse:", error);
      }
    }

    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const resetForm = () => {
    setSelectedUser(null);
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

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        user={selectedUser}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {isFormVisible && (
        <UserForm
          user={selectedUser}
          onSave={handleEditUser}
          onCancel={resetForm}
        />
      )}
      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(user) => {
          setSelectedUser(user);
          setIsDetailsModalOpen(true);
        }}
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
