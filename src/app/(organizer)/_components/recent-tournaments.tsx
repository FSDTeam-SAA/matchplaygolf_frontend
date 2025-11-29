import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"

const tournaments = [
  {
    id: 1,
    name: "Spring Championship 2023",
    location: "Pine Valley Golf Club",
    date: "May 15-20, 2023",
    players: 48,
  },
  {
    id: 2,
    name: "Spring Championship 2023",
    location: "Pine Valley Golf Club",
    date: "May 15-20, 2023",
    players: 48,
  },
  {
    id: 3,
    name: "Spring Championship 2023",
    location: "Pine Valley Golf Club",
    date: "May 15-20, 2023",
    players: 48,
  },
]

export function RecentTournaments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tournaments</CardTitle>
        <button className="text-red-600 text-sm font-medium hover:text-red-700">View All</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{tournament.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {tournament.date}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{tournament.players}</p>
                <p className="text-xs text-muted-foreground">Players</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
