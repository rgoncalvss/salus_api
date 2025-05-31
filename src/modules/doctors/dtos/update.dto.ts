import { z } from 'zod';

const updateSchema = z.object({
  crm: z.number().int().positive('CRM must be a positive integer').optional(),
  email: z.string().email('Invalid email format').optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  specialty: z.string().optional(),
});

export function updateDoctorDTO(doctor: unknown) {
  const parsedDoctor = updateSchema.parse(doctor);

  return parsedDoctor;
}
