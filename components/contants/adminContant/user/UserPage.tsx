"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { User } from "@/schemas/userSchema";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";
import UserDetailsModal from "./UserDetailsModal";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: userData } = useGetAllUserQuery();

  useEffect(() => {
    if (userData) {
      setUsers(userData.data);
      setFilteredUsers(userData.data);
    }
  }, [userData]);
console.log(isFormVisible)
  const handleEdit = (user: User) => {
    console.log('first')
    setSelectedUser(user);
    setIsFormVisible(true);
    handleEditUser(user)
  };
  const handleEditUser = async (user: User) => { 
    console.log(user, 'for editing user');
                

  }

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const [deleteUser] = useDeleteUserMutation();

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
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
