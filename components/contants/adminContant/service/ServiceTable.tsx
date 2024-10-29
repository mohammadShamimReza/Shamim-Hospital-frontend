import { Service } from "@/schemas/serviceSchema";
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
}

export default function ServiceTable({ serviceList }: ServiceTableProps) {
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
        {serviceList.map((service, index) => (
          <TableRow key={index}>
            <TableCell>{service.serviceName}</TableCell>
            <TableCell>${service.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
