export interface Appointment {
  date: string;
  doctorId: string;
  hour: string;
  patientId: string;
}

export interface UpdateAppointment {
  date?: string;
  doctor?: { id: string };
  doctorId?: string;
  hour?: string;
  id?: string;
  patient?: { id: string };
  patientId?: string;
}
