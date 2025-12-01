export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string;
  accessToken: string;
  refreshToken: string;
};
