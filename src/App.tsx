import { Routes, Route } from 'react-router-dom'
import { ResultsProvider } from './store/useResults'
import { SettingsProvider } from './store/useSettings'
import { LiveProvider } from './store/useLive'
import { AuthProvider } from './store/useAuth'
import { Sync } from './store/Sync'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Groups } from './pages/Groups'
import { Schedule } from './pages/Schedule'
import { KnockoutBracket } from './pages/KnockoutBracket'
import { Teams } from './pages/Teams'
import { TeamDetail } from './pages/TeamDetail'
import { Venues } from './pages/Venues'
import { Stats } from './pages/Stats'
import { MyTeam } from './pages/MyTeam'

export default function App() {
  return (
    <SettingsProvider>
      <ResultsProvider>
        <AuthProvider>
        <LiveProvider>
        <Sync />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/grupe" element={<Groups />} />
            <Route path="/raspored" element={<Schedule />} />
            <Route path="/live" element={<Schedule onlyLive />} />
            <Route path="/nokaut" element={<KnockoutBracket />} />
            <Route path="/timovi" element={<Teams />} />
            <Route path="/timovi/:code" element={<TeamDetail />} />
            <Route path="/moj-tim" element={<MyTeam />} />
            <Route path="/stadioni" element={<Venues />} />
            <Route path="/statistika" element={<Stats />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Layout>
        </LiveProvider>
        </AuthProvider>
      </ResultsProvider>
    </SettingsProvider>
  )
}
