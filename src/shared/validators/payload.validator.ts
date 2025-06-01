/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface UserPayload {
  id: string;
  type: string;
}

export const isValidUserPayload = (payload: any): payload is UserPayload => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    payload &&
    typeof payload === 'object' &&
    typeof payload.id === 'string' &&
    typeof payload.type === 'string'
  );
};
