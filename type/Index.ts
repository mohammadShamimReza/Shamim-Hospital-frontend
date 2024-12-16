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

export interface Pharmacy {
  id: number;
  name: string;
  stockQuantity: number;
  unitPrice: number;
  image: string;
  expiryDate: string; // ISO date string, corresponds to DateTime in Prisma
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  appointments?: Appointment[]; // Optional, linked appointments
}

export interface Laboratory {
  testName: string;
  price: number;
  appointmentId: number;
  testDate: string;
  result: string;
}

export interface Inventory {
  itemName: string; // Name of the inventory item
  quantity: number; // Quantity of the item in stock
  price: number; // Price of the inventory item
  category: string; // Allowed categories
  purchaseDate: string; // Date the item was purchased
  status: string;
}

export interface Diagnostic {
  diagnosticName: string; // Name of the diagnostic test
  price: number; // Cost of the diagnostic test
}