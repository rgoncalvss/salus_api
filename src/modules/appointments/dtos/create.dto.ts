import { z } from 'zod';

const createSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  doctorId: z.string().min(1, 'Doctor ID is required'),
  hour: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hour must be in HH:MM format'),
  patientId: z.string().min(1, 'Patient ID is required'),
});

export function createAppointmentsDTO(appointment: unknown) {
  const parsedAppointment = createSchema.parse(appointment);

  return parsedAppointment;
}
