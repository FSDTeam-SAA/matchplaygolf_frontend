// Billing Address
export interface BillingAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  companyName: string;
}

// Main Tournament / Order Data
export interface TournamentOrderData {
  billingAddress: BillingAddress;
  _id: string;
  orderId: string;
  tournamentName: string;
  sportName: string;
  drawFormat: string;
  format: string;
  drawSize: number;
  location: string;
  price: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: "scheduled" | "completed" | "cancelled";
  totalParticipants: number;
  registeredPlayers: string[];
  totalRounds: number;
  rememberEmail: number;
  knockoutStage: null | unknown;
  createdBy: string;
  startDate: string; // ISO Date
  endDate: string;   // ISO Date
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  __v: number;
  entryConditions: string[];
  range: string[];
  rules: string;
}

// API Response Wrapper
export interface TournamentOrderResponse {
  success: boolean;
  data: TournamentOrderData;
}
















// export interface BillingAddress {
//   fullName: string;
//   email: string;
//   phone: string;
//   country: string;
//   streetAddress: string;
//   city: string;
//   zipcode: string;
//   companyName: string;
// }

// export interface TournamentOrderData {
//   billingAddress: BillingAddress;
//   rememberEmail: number;
//   _id: string;
//   orderId: string;
//   tournamentName: string;
//   sportName: string;
//   drawFormat: "Knockout" | string;
//   format: "Single" | "Double" | string;
//   drawSize: number;
//   price: string;
//   location:string;
//   numberOfSeeds:string;
//   paymentStatus: "pending" | "paid" | "failed" | string;
//   status: "scheduled" | "completed" | "cancelled" | string;
//   totalParticipants: number;
//   registeredPlayers: string[]; // update if player object exists later
//   knockoutStage: null | unknown;
//   createdBy: string;
//   startDate: string; // ISO Date
//   endDate: string;   // ISO Date
//   createdAt: string; // ISO Date
//   updatedAt: string; // ISO Date
//   totalRounds: number;
//   __v: number;
// }

// export interface TournamentOrderResponse {
//   success: boolean;
//   data: TournamentOrderData;
// }
