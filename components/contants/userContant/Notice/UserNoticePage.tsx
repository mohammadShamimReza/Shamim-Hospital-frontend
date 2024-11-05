import { useGetAllNoticeQuery } from '@/redux/api/noticeApi'
import React from 'react'
import { format } from "date-fns";


export default function UserNoticePage() {
  const { data: notices, isLoading } = useGetAllNoticeQuery()
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-4">
          <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
        </div>
      );
    }  return (
    <div>
      {" "}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Notices</h2>
        <div className="space-y-4">
          {notices?.data.map((notice) => (
            <div key={notice.id} className="p-4 border rounded-md shadow-md">
              <h3 className="text-lg font-bold">{notice.title}</h3>
              <p className=" mb-2">
                {format(new Date(notice.createdAt), "PPP p")}
              </p>
              <p className="">{notice.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
