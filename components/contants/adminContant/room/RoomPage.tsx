"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import RoomDeleteConfirmationModal from "./RoomDeleteConfirmationModal";
import RoomDetailsModal from "./RoomDetailsModal";
import RoomForm from "./RoomForm";
import RoomTable from "./RoomTable";

import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetAllRoomQuery,
  useUpdateRoomMutation,
} from "@/redux/api/roomApi";
import { Room } from "@/type/Index";
import { toast } from "sonner";

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: roomData, isLoading } = useGetAllRoomQuery();

  const [createRoom, { isLoading: createing }] = useCreateRoomMutation();
  const [updateRoom, { isLoading: updating }] = useUpdateRoomMutation();
  const [deleteRoom, { isLoading: deleting }] = useDeleteRoomMutation();
  if (createing || updating || deleting) {
    toast(createing ? "createing" : updating ? "updating" : "deleting", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }
  useEffect(() => {
    if (roomData?.data) setRooms(roomData.data);
  }, [roomData]);

  const handleSaveRoom = async (room: Room) => {
    console.log(room, "before save");
    try {
      if (isEditing && selectedRoom !== null) {
        if (room.id) {
          const result = await updateRoom({ id: room.id, body: room });
          console.log("Roon Updated:", result);
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
        const result = await createRoom(room);
        console.log("Room Added:", result);
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

  const handleEdit = (room: Room) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setSelectedRoom(room);
  };

  const handleDetailsModal = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteModal = (room: Room) => {
    console.log(room);
    setSelectedRoom(room);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRoom && selectedRoom.id) {
      try {
        const res = await deleteRoom(selectedRoom.id);

        console.log("Room Deleted:", res);
        setSelectedRoom(null);

        setIsDeleteModalOpen(false);
      } catch (error) {
        console.log("Error Deleting Nurse:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            setIsFormVisible(true);
            setIsEditing(false);
          }}
        >
          Add Room
        </Button>
        <Input placeholder="Search rooms" className="w-1/2" />
      </div>

      {isFormVisible && (
        <RoomForm
          onSubmit={handleSaveRoom}
          onCancel={() => setIsFormVisible(false)}
          initialData={selectedRoom ? selectedRoom : null}
          isEditing={isEditing}
        />
      )}

      <RoomDetailsModal
        isDetailsModalOpen={isDetailsModalOpen}
        room={selectedRoom}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <RoomTable
        rooms={rooms}
        onEdit={handleEdit}
        onDelete={handleDeleteModal}
        onView={handleDetailsModal}
        isLoading={isLoading}
      />

      <RoomDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
