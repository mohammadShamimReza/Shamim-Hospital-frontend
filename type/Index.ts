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
}


