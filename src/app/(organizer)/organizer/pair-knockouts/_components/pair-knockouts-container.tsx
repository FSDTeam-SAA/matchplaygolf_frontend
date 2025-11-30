import React from 'react'

const PairKnockoutsContainer = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-white p-6 sticky top-0  z-50">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#181818] leading-[150%]">
          Spring Championship {new Date().getFullYear()}
        </h1>
        <p className="text-sm font-normal text-[#424242] leading-[150%]">
          View tournament bracket progression
        </p>
      </div>
    </div>
  )
}

export default PairKnockoutsContainer
