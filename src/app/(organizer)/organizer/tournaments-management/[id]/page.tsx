import React from 'react'
import TournamentsDetails from './_components/tournament-tabs'
import TournamentsHeader from './_components/tournament-header'

const TournamentDetailsPage = ({params}:{params:{id:string}}) => {
  console.log(params)
  return (
    <div>
      <TournamentsHeader/>
      <TournamentsDetails/>
    </div>
  )
}

export default TournamentDetailsPage