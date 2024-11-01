import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetStaffByIdQuery } from "@/redux/api/staffApi";
import { useAppSelector } from "@/redux/hooks";

export default function StaffRoom() {
  const nurseInfo = useAppSelector((state) => state.auth.userInfo);
  const { data, isLoading } = useGetStaffByIdQuery({
    id: Number(nurseInfo.id),
  });
  console.log(data);
  if (isLoading) {
    return <p>Loading room data...</p>;
  }

  return (
    <Card className="max-w-lg mx-auto my-8">
      <CardHeader>
        <CardTitle>
          {" "}
          {data?.data?.room === null
            ? "You are not assigned any where"
            : "Assigned Room Details"}
        </CardTitle>
      </CardHeader>
      {data?.data?.room === null ? (
        ""
      ) : (
        <CardContent className="space-y-4">
          <div>
            <strong>Room Number:</strong> {data?.data.room?.roomNumber}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
