export interface ProfileApiResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}

export interface ProfileData {
  organizerLogo: string;
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  organizationName: string;
  dob: string; // ISO date string
  gender: "male" | "female" | "other" | string;
  role: string;
  clubName: string;
  handicap: string;
  whsNumber: string;
  profileImage: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
  country: string;
  newsletterPreference: "subscribe" | "unsubscribe" | string;
  receiveOrderUpdates: boolean;
  sportNationalId: string;
}
