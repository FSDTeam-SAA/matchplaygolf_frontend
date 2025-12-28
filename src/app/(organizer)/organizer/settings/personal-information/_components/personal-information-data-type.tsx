export interface ProfileApiResponse {
  success: boolean
  message: string
  data: ProfileData
}


export interface ProfileData {
  _id: string
  fullName: string
  email: string
  phone: string
  organizationName: string
  dob: string // ISO date string
  gender: "Male" | "Female" | "Other"
  role: "Organizer" | "User" | "Admin"
  clubName: string
  country: string
  handicap: string
  whsNumber: string
  color: string
  newsletterPreference: "subscribe" | "unsubscribe"
  receiveOrderUpdates: boolean
  profileImage: string
  organizerLogo: string
  sportNationalId: string
  isVerified: boolean
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

