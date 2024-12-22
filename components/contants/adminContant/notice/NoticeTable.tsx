"use client";

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
import { Notice } from "@/schemas/noticeSchema";

interface NoticeTableProps {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
  onView: (notice: Notice) => void;
  isLoading: boolean;
}

export default function NoticeTable({
  notices,
  onEdit,
  onDelete,
  onView,
  isLoading,
}: NoticeTableProps) {
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
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Expair IN</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notices.map((notice, index) => (
          <TableRow key={notice.id ?? index}>
            <TableCell>{notice.title}</TableCell>
            <TableCell>
              {notice.content.split(" ").slice(0, 4).join(" ")}...
            </TableCell>
            <TableCell>{notice.expiryDate}</TableCell>

            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(notice)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(notice)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(notice)}
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
