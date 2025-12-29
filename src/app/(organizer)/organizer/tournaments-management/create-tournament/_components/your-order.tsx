"use client"

import React from 'react'
import { useTournamentStore } from "@/store/useTournamentStore";

const YourOrder = () => {
  const {step1Data} = useTournamentStore()

  console.log(step1Data)
  return (
    <div>
        <div className='bg-white rounded-[14px] border border-[#E0E0E0] shadow-[0px_1px_2px_-1px_#0000001A,_0px_1px_3px_0px_#0000001A] p-6'>
            <h2 className='text-lg md:text-xl lg:text-2xl text-black leading-[150%] font-bold'>Your Order</h2>
            <div className="pt-5">
                <p className='flex items-center justify-between gap-5 text-base text-[#333333] leading-[120%] font-semibold'><span  className="font-bold">Tournament Name : </span> <span>{step1Data?.tournamentName || "N/A"}</span></p>
                <p className='flex items-center justify-between gap-5 text-base text-[#333333] leading-[120%] font-semibold py-4'><span  className="font-bold">Sport Name :</span> <span>{step1Data?.sportName || "N/A"}</span></p>
                <p className='flex items-center justify-between gap-5 text-base text-[#333333] leading-[120%] font-semibold'><span  className="font-bold">Draw Format :</span> <span>{step1Data?.drawFormat || "N/A"}</span></p>
                <p className='flex items-center justify-between gap-5 text-base text-[#333333] leading-[120%] font-semibold py-4'><span  className="font-bold">Format :</span> <span>{step1Data?.format || "N/A"}</span></p>
                <p className='flex items-center justify-between gap-5 text-base text-[#333333] leading-[120%] font-semibold'><span  className="font-bold">Total Draw Size :</span> <span>{step1Data?.totalDrawSize || "N/A"}</span></p>
                <p className='flex items-center justify-between gap-5 text-base text-[#333333] leading-[120%] font-semibold py-4'><span  className="font-bold">Total Price :</span> <span> £ {step1Data?.price || "N/A"}</span></p>

            </div>
        </div>
    </div>
  )
}

export default YourOrder