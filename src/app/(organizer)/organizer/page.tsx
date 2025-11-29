import React from 'react'
import { DashboardOverview } from '../_components/dashboard-overview'
import { PlayerParticipation } from '../_components/player-participation'
import RecentTournaments from '../_components/recent-tournaments'
import DashboardOverviewHeader from '../_components/dashboard-overview-header'

const OrganizerPage = () => {
  return (
    <div>
      <DashboardOverviewHeader/>
      <DashboardOverview/>
      <PlayerParticipation/>
      <RecentTournaments/>
    </div>
  )
}

export default OrganizerPage
