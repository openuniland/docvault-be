export default interface JWTPayload {
  role: string;
  name: string;
  email: string;
  is_blocked: boolean;
}

export interface Content {
  name: string;
  image?: string;
  file?: string;
  description?: string;
}
