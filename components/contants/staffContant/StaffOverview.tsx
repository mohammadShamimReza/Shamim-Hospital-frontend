"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, MessageSquare, UserIcon } from "lucide-react"; // Icons for illustration

import { useNavigation } from "@/contexts/NavigatoinContext";

export default function NurseOverviewPage() {
  const { setSelectedMenu } = useNavigation();
  return (
    <>
      {/* Header with Breadcrumbs */}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-3">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold ">
            Hospital Management Overview
          </h1>
          <p className=" mt-2">
            Manage and monitor hospital activities effectively with a quick
            overview of each section.
          </p>
        </header>

        <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
         
          {/* Notices Section */}
          <Card className="p-4">
            <CardHeader>
              <Bell className="text-red-600 size-6 mb-2" />
              <CardTitle>Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Broadcast important updates and announcements.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  onClick={() => setSelectedMenu("Notice")}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Go to Notice
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messaging Section */}
          <Card className="p-4">
            <CardHeader>
              <MessageSquare className="text-pink-600 size-6 mb-2" />
              <CardTitle>Messaging</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Facilitate direct communication between hospital staff.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  onClick={() => setSelectedMenu("Doctors")}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Go to Inbox
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <Calendar className="text-indigo-600 size-6 mb-2" />
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Oversee yourself availability.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  onClick={() => setSelectedMenu("Account")}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Go to Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
