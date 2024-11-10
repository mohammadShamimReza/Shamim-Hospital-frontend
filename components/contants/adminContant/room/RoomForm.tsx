import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  roomSchema } from "@/schemas/roomSchema";
import { Room } from "@/type/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface RoomFormProps {
  onSubmit: (data: Room) => void;
  onCancel: () => void;
  initialData?: Room | null;
  isEditing: boolean;
}

export default function RoomForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: RoomFormProps) {
  const methods = useForm<Room>({
    resolver: zodResolver(roomSchema),
    defaultValues: initialData || {
      roomNumber: "",
      needNurseAndStaff: 0
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Room" : "Add New Room"}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data, "Submitted Notice");
              onSubmit(data);
              reset();
            })}
            className="grid gap-4"
          >
            <FormField
              control={control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name / Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Room Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.roomNumber?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="needNurseAndStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total nurse and staff neede</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="needNurseAndStaff"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.needNurseAndStaff?.message}</FormMessage>
                </FormItem>
              )}
            />

           

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Room" : "Add Room"}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
