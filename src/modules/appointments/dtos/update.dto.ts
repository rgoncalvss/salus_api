import { z } from 'zod';

const updateSchema = z.object({
  date: z.string().min(1, 'Date is required').optional(),
  doctorId: z.string().min(1, 'Doctor ID is required').optional(),
  hour: z.string().min(1, 'Hour is required').optional(),
  patientId: z.string().min(1, 'Patient ID is required').optional(),
});

export function updateAppointmentsDTO(appointment: unknown) {
  const parsedAppointment = updateSchema.parse(appointment);

  return parsedAppointment;
}
