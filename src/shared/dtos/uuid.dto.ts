import * as z from 'zod';

const uuidSchema = z.string().uuid();

export function uuidDto(input: unknown) {
  const id =
    typeof input === 'object' && input !== null && 'id' in input
      ? (input as { id: string }).id
      : input;

  const parsed = uuidSchema.parse(id);

  return parsed;
}
