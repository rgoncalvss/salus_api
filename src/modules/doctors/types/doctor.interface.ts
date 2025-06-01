import { Appointment } from '../../appointments/types/appointment.interface';

export interface Doctor {
  appointments?: Appointment[];
  createdAt: Date;
  crm: number;
  email: string;
  id: string;
  name: string;
  password: string;
  specialty: string;
  updatedAt: Date;
}
