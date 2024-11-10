"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetAllNurseQuery } from "@/redux/api/nurseApi";
import { useGetAllStaffQuery } from "@/redux/api/staffApi";
import { useUpdateRoomMutation } from "@/redux/api/roomApi";
import { toast } from "sonner";

interface PersonType {
  id: number;
  name: string;
  role: string;
}


export default function AddStaffAndNurse({roomId}:{ roomId: number; }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: nurseData } = useGetAllNurseQuery();
  const { data: staffData } = useGetAllStaffQuery();
  const [updateRoom] = useUpdateRoomMutation();


  const combinedData = [
    ...(nurseData?.data?.map((nurse) => ({
      ...nurse,
      uniqueId: `nurse-${nurse.id}`,
    })) || []),
    ...(staffData?.data?.map((staff) => ({
      ...staff,
      uniqueId: `staff-${staff.id}`,
    })) || []),
  ];

  const handleAddNurseAndStaff = async (person: PersonType) => {
    console.log(person, "person");
    try {
      
      const body =
        person.role === "nurse"
          ? { addNurses: [person.id] } 
          : { addStaff: [person.id] };

      const result = await updateRoom({ id: roomId, body }).unwrap();
      if (result?.error) { 
        toast('Something went wrong')
      } else {
        toast('Added successfully')
        setOpen(false);
        setValue(""); // Clear the input field after successful addition
      }

      console.log("Room updated successfully:", result);
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
           Select Staff or Nurse...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search staff or nurse by name..." />
          <CommandList>
            <CommandEmpty>No staff or nurse found.</CommandEmpty>
            <CommandGroup>
              {combinedData.map((person) => {
                const personKey = `${person.role}-${person.id}`;
                return (
                  <CommandItem
                    key={personKey}
                    value={person.name}
                    onSelect={() => {
                      setValue(personKey);
                      setOpen(false);
                      handleAddNurseAndStaff(person); // Call the function with the selected person
                    }}
                  >
                    <span>
                      {person.name} - {person.role}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === personKey ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
