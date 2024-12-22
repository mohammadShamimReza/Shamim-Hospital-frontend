import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Service } from "@/schemas/serviceSchema";

interface ServiceTableProps {
  services: Service[];
  onEdit: (notice: Service) => void;
  onDelete: (notice: Service) => void;
  onView: (notice: Service) => void;
  isLoading: boolean;
}

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: ServiceTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Name</TableHead>
          <TableHead>price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service, index) => (
          <TableRow key={index}>
            <TableCell>{service.serviceName}</TableCell>
            <TableCell>${service.price}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(service)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(service)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(service)}
                >
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
