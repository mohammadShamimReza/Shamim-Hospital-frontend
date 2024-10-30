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
