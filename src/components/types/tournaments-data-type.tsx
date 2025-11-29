export interface Tournament {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  players: number;
  status: "Active" | "Upcoming" | "Registration";
}