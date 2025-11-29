import React from 'react'
import { DashboardOverview } from '../_components/dashboard-overview'
import { PlayerParticipation } from '../_components/player-participation'
import { RecentTournaments } from '../_components/recent-tournaments'

const OrganizerPage = () => {
  return (
    <div>
      <DashboardOverview/>
      <PlayerParticipation/>
      <RecentTournaments/>
    </div>
  )
}

export default OrganizerPage
