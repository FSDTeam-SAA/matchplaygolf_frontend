export interface BillingAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  streetAddress: string;
  city: string;
  district: string;
  zipcode: string;
}

export interface CreatedBy {
  _id: string;
  fullName: string;
  email: string;
}

export interface Tournament {
  billingAddress: BillingAddress;
  _id: string;
  orderId: string;
  tournamentName: string;
  sportName: string;
  drawFormat: string;
  format: string;
  drawSize: number;
  price: string;
  paymentStatus: string;
  status: string;
  rules: string[];
  createdBy: CreatedBy;
  startDate: string; // ISO date string
  endDate: string;   // looks like timestamp stored as string
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TournamentResponseData {
  tournaments: Tournament[];
  currentPage: number;
  totalPages: number;
  totalTournaments: number;
}

export interface TournamentResponse {
  success: boolean;
  data: TournamentResponseData;
}
