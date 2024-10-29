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
import { Service, serviceSchema } from "@/schemas/serviceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface ServiceFormProps {
  isEditing: boolean;
  initialData?: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

export default function ServiceForm({
  isEditing,
  initialData,
  onSave,
  onCancel,
}: ServiceFormProps) {
  const methods = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      serviceName: "",
      description: "",
      duration: 0,
      price: 0,
      serviceType: "Consultation",
      bodyPart: "",
      specialty: "",
      maxAppointments: undefined,
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
        <CardTitle>{isEditing ? "Edit Service" : "Add New Service"}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSave(data);
              console.log("Service Data Submitted:", data); // Log form data on submit
              reset();
            })}
            className="grid gap-4"
          >
            <FormField
              control={control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Service Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.serviceName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (in minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Duration"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.duration?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded-md p-2">
                      <option value="Consultation">Consultation</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Therapy">Therapy</option>
                    </select>
                  </FormControl>
                  <FormMessage>{errors.serviceType?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bodyPart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Part</FormLabel>
                  <FormControl>
                    <Input placeholder="Body Part" {...field} />
                  </FormControl>
                  <FormMessage>{errors.bodyPart?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Input placeholder="Specialty" {...field} />
                  </FormControl>
                  <FormMessage>{errors.specialty?.message}</FormMessage>
                </FormItem>
              )}
            />

            

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? "Update Service" : "Add Service"}
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
