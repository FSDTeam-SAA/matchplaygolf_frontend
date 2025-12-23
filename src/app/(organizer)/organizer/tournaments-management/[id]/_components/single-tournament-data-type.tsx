export interface BillingAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  streetAddress: string;
  city: string;
  zipcode: string;
  companyName: string;
}

export interface TournamentOrderData {
  billingAddress: BillingAddress;
  rememberEmail: number;
  _id: string;
  orderId: string;
  tournamentName: string;
  sportName: string;
  drawFormat: "Knockout" | string;
  format: "Single" | "Double" | string;
  drawSize: number;
  price: string;
  location:string;
  numberOfSeeds:string;
  paymentStatus: "pending" | "paid" | "failed" | string;
  status: "scheduled" | "completed" | "cancelled" | string;
  totalParticipants: number;
  registeredPlayers: string[]; // update if player object exists later
  knockoutStage: null | unknown;
  createdBy: string;
  startDate: string; // ISO Date
  endDate: string;   // ISO Date
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  totalRounds: number;
  __v: number;
}

export interface TournamentOrderResponse {
  success: boolean;
  data: TournamentOrderData;
}
