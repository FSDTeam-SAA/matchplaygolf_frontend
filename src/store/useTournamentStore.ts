// store/useTournamentStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TournamentStep1 {
  tournamentName: string;
  sportName: string;
  drawFormat: string;
  format: string;
  totalDrawSize: string;
  terms: boolean;
}

interface TournamentStep2 {
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  townCity: string;
  county?: string;
  postcode: string;
  phone: string;
}

interface TournamentStore {
  step: 1 | 2;
  step1Data: TournamentStep1 | null;
  step2Data: TournamentStep2 | null;

  setStep: (step: 1 | 2) => void;
  setStep1Data: (data: TournamentStep1) => void;
  setStep2Data: (data: TournamentStep2) => void;
  reset: () => void;
}

export const useTournamentStore = create<TournamentStore>()(
  persist(
    (set) => ({
      step: 1,
      step1Data: null,
      step2Data: null,
      reset: () => set({ step: 1, step1Data: null, step2Data: null }),
      setStep: (step) => set({ step }),
      setStep1Data: (data) => set({ step1Data: data, step: 2 }),
      setStep2Data: (data) => set({ step2Data: data }),
      resetisements: () => set({ step: 1, step1Data: null, step2Data: null }),
    }),
    {
      name: "tournament-storage",
    }
  )
);
