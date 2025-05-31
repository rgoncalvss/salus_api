import { z } from 'zod';

const createSchema = z.object({
  crm: z.number().int().positive('CRM must be a positive integer'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required'),
  specialty: z.string().min(1, 'Specialty is required'),
});

export function createDoctorDTO(doctor: unknown) {
  const parsedDoctor = createSchema.parse(doctor);

  return parsedDoctor;
}
