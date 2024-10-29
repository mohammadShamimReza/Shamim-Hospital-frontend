import { Service } from "@/schemas/serviceSchema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceTableProps {
  serviceList: Service[];
  onEdit: (service: Service, index: number) => void;
  onDelete: (index: number) => void;
  onView: (service: Service) => void;
}

export default function ServiceTable({
  serviceList,
  onEdit,
  onDelete,
  onView,
}: ServiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serviceList.map((service, index) => (
          <TableRow
            key={service.id ?? index}
            onClick={() => onView(service)}
            className="cursor-pointer"
          >
            <TableCell>{service.serviceName}</TableCell>
            <TableCell>{service.departmentId ?? "N/A"}</TableCell>
            <TableCell>{service.status}</TableCell>
            <TableCell>${service.price}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(service, index);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
