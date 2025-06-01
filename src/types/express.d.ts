interface UserPayload {
  exp?: number;
  iat?: number;
  id: string;
  type: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
