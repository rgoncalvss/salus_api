import { z } from 'zod';

const createSchema = z.object({
  birthDate: z.string(),
  cellphone: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required'),
});

export function createPatientDTO(patient: unknown) {
  const parsedPatient = createSchema.parse(patient);

  return parsedPatient;
}
