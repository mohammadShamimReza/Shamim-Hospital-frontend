
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetNurseByIdQuery } from '@/redux/api/nurseApi'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

export default function NurseRoom() {
  const nurseInfo = useAppSelector(state => state.auth.userInfo)
  const { data, isLoading } = useGetNurseByIdQuery({ id: Number(nurseInfo.id) })
  console.log(data)
      if (isLoading) {
        return (
          <div className="flex items-center justify-center py-4">
            <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
          </div>
        );
      }

    return (
      <Card className="max-w-lg mx-auto my-8">
        <CardHeader>
          <CardTitle>
            {" "}
            {!data?.data?.room 
              ? "You are not assigned any where"
              : "Assigned Room Details"}
          </CardTitle>
        </CardHeader>
        {!data?.data?.room  ? (
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
