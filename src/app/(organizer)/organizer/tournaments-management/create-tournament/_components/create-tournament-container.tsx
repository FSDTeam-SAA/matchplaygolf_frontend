"use client"

import { useTournamentStore } from "@/store/useTournamentStore";
import Step1Form from "./step-form1";
import Step2Form from "./setp-form2";

export default function CreateTournamentContainer() {
  const { step } = useTournamentStore();


  return (
    <div className="px-6 pt-6 pb-20">
      <div className="">

        {/* Conditional Rendering */}
        {step === 1 && <Step1Form />}
        {step === 2 && <Step2Form />}
      </div>
    </div>
  );
}