export interface Nurse {
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
  serviceId: number;
  Service: Service;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  expiryDate: string;
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
  price: number;
  patientId: number;
  patient: User;
  status: string;
  appointmentDate: Date;
  serviceId: number;
  Service: Service;
  prescription: string;
  Billing: BillingAppointment;
  DiagnosticAppointment: DiagnosticAppointment[];
  LabAppointment: LaboratoryAppointment[];
  Pharmacy: PharmacyAppointment[];
}

export interface BillingAppointment {
  id: number;
  userId: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: string;
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
  id: number;
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
  id: number;
  diagnosticName: string; // Name of the diagnostic test
  price: number; // Cost of the diagnostic test
}

export interface DiagnosticAppointment {
  id: number;
  diagnosticId: number;
  appointmentId: number;
  result?: string;
  status: string;
  diagnostic: Diagnostic;
}

export interface LaboratoryAppointment {
  id: number;
  laboratoryId: number;
  appointmentId: number;
  result?: string;
  status: string;
  testDate: string;
  laboratory: Laboratory;
}

export interface PharmacyAppointment {
  id: number;
  pharmacyId: number;
  appointmentId: number;
  pharmacy: Pharmacy;
}