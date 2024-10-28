"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowDownCircle } from "lucide-react";

// Mock notification data
const mockNotifications = {
  current: [
    {
      title: "Updated Health Policy",
      date: "2024-10-23",
      description:
        "New updates in the health policy have been implemented. Please review the document attached.",
      document: "/documents/health_policy.pdf",
    },
    {
      title: "Doctor Appointment Reminder",
      date: "2024-10-24",
      description:
        "Your upcoming appointment with Dr. Smith is scheduled for tomorrow at 10:00 AM.",
    },
  ],
  previous: [
    {
      title: "COVID-19 Safety Guidelines",
      date: "2024-09-15",
      description: "Updated COVID-19 safety protocols for patients and staff.",
      document: "/documents/covid_guidelines.pdf",
    },
    {
      title: "Flu Season Precautions",
      date: "2024-08-30",
      description:
        "Flu season precautions and best practices. Make sure to review.",
    },
  ],
};

export default function NotificationPage() {
  const [notifications] = useState(mockNotifications);

  return (
    <div className="p-6 space-y-8 min-h-screen ">
      {/* Current Notifications Section */}
      <Card className="shadow-lg border border-gray-100">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-2xl font-semibold">
            Current Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {notifications.current.length > 0 ? (
            notifications.current.map((notification, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {notification.title}
                  </h3>
                  <Badge>New</Badge>
                </div>
                <p className="text-sm mb-1">
                  <strong>Date:</strong> {notification.date}
                </p>
                <p className="">{notification.description}</p>
                {notification.document && (
                  <a
                    href={notification.document}
                    download
                    className="flex items-center text-blue-600 mt-2 hover:underline"
                  >
                    <ArrowDownCircle className="mr-2 w-4 h-4" />
                    Download Document
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No new notifications.</p>
          )}
        </CardContent>
      </Card>

      {/* Previous Notifications Section */}
      <Card className="shadow-lg border border-gray-100">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-2xl font-semibold">
            Previous Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {notifications.previous.length > 0 ? (
            notifications.previous.map((notification, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className=" text-sm mb-1">
                  <strong>Date:</strong> {notification.date}
                </p>
                <p className="">{notification.description}</p>
                {notification.document && (
                  <a
                    href={notification.document}
                    download
                    className="flex items-center text-blue-600 mt-2 hover:underline"
                  >
                    <FileText className="mr-2 w-4 h-4" />
                    Download Document
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No previous notifications.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
