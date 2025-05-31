import { z } from 'zod';

const updateSchema = z.object({
  birthDate: z.string().optional(),
  cellphone: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  name: z.string().optional(),
  password: z.string().optional(),
});

export function updatePatientDTO(patient: unknown) {
  const parsedPatient = updateSchema.parse(patient);

  return parsedPatient;
}
