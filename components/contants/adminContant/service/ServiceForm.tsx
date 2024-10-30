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
  onSubmit: (data: Service) => void;
  onCancel: () => void;
  initialData?: Service | null;
  isEditing: boolean;
}

export default function ServiceForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: ServiceFormProps) {
  const methods = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      serviceName: "",
      description: "",
      price: 0,
      serviceType: "Consultation",
      bodyPart: "",
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
              console.log(data, "Submitted Notice");
              onSubmit(data);
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
