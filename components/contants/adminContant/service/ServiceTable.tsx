import { Service } from "@/schemas/serviceSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface ServiceTableProps {
  services: Service[];
  onEdit: (notice: Service) => void;
  onDelete: (notice: Service) => void;
  onView: (notice: Service) => void;
}

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
  onView,
}: ServiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
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
