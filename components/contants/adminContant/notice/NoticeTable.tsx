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
  noticeList: Notice[];
  onEdit: (notice: Notice, index: number) => void;
  onDelete: (index: number) => void;
}

export default function NoticeTable({
  noticeList,
  onEdit,
  onDelete,
}: NoticeTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {noticeList.map((notice, index) => (
          <TableRow key={notice.id ?? index}>
            <TableCell>{notice.title}</TableCell>
            <TableCell>{notice.date}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(notice, index);
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
