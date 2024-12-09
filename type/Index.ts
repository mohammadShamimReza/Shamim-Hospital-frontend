export interface Nurse {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string ;
  profile_image: string | null;
  role: string;
  roomId: string | null;
  room: {
    roomNumber: number;
  }
}


export interface Staff {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  profile_image: string | null;
  role: string;
  roomId: string | null;
  room: {
    roomNumber: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  profile_image: string | null;
  role: string;
  roomId: string | null;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  profile_image: string | null;
  role: string;
  roomId: string | null;
}

export interface Doctor {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: string;
  designation: string;
  passingYear: string;
  appointments?: Appointment[];
}


export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Service { 
  id: number;
  serviceName: string;
  description: string;
  price: number;
  serviceType: string;
  bodyPart: string;
}


export interface Room {
  id: number;
  roomNumber: string;
  needNurseAndStaff: number;
  nurses: Nurse[] | [];
  staff: Staff[] | [];
}


export interface Appointment {
  id: number;
  doctorId: number;
  doctor: Doctor;

  patientId: number;
  patient: User;

  appointmentDate: Date;
  serviceId: number;
  Service: Service;
  prescription: string;
}