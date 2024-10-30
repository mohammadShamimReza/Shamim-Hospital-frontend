"use client";

import { Notice } from "@/schemas/noticeSchema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NoticeTableProps {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
  onView: (notice: Notice) => void;
}

export default function NoticeTable({
  notices,
  onEdit,
  onDelete,
  onView,
}: NoticeTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
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
