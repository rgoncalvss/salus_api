import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  type: z.string().min(1, 'Type is required'),
});

export function loginDTO(user: unknown) {
  const parsedUser = loginSchema.parse(user);

  return parsedUser;
}
