"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.authToken || getTokenFromCookie();
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "createUser",
    "createDoctor",
    "createNurse",
    "createStaff",
    "createAdmin",
    "getUsers",
    "getDoctors",
    "getNurses",
    "getStaff",
    "getAdmins",
    "updateUser",
    "updateStaff",
    "updateDoctor",
    "updateNurse",
    "updateAdmin",
    "deleteUser",
    "deleteStaff",
    "deleteDoctor",
    "deleteNurse",
    "deleteAdmin",
    "createRoom",
    "getRooms",
    "updateRoom",
    "deleteRoom",
    "createAppointment",
    "getAppointments",
    "updateAppointment",
    "deleteAppointment",
    "getNotices",
    "createNotice",
    "updateNotice",
    "deleteNotice",
    "getServices",
    "createService",
    "deleteService",
    "getRoomDetails",
    "getDoctorDetails",
    "getNoticeDetails",
    "Doctor",
    "Notice",
    "Nurse",
    "Room",
    "Service",
    "Staff",
    "User",
    "Pharmacy",
    "getPharmacys",
  ],
});
