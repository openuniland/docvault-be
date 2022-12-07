export default interface JWTPayload {
  role: string;
  name: string;
  email: string;
  is_blocked: boolean;
}
