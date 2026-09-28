import { useNavigate } from 'react-router-dom'
import { Target, Lightbulb, Compass, LogOut, ArrowRight } from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const profile = JSON.parse(localStorage.getItem('profile') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-serif-custom text-xl text-ink font-bold">ResearchMatch</span>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-text/70 hover:text-ink">
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl text-ink font-bold mb-2">
          Welcome, {user.name || 'there'}
        </h1>
        <p className="text-text/70 mb-10">Here's where your research journey stands</p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-ink/10 rounded-lg p-6 hover:border-ink/20 hover:-translate-y-0.5 transition-all">
            <Compass className="text-gold mb-3" size={20} />
            <div className="text-xs uppercase tracking-wide text-sage font-medium mb-2">
              Career goal
            </div>
            <div className="text-xl text-ink font-semibold">
              {profile?.career_goal || 'Not set'}
            </div>
          </div>

          <div className="bg-white border border-ink/10 rounded-lg p-6 hover:border-ink/20 hover:-translate-y-0.5 transition-all">
            <Target className="text-gold mb-3" size={20} />
            <div className="text-xs uppercase tracking-wide text-sage font-medium mb-2">
              Skills on file
            </div>
            <div className="text-sm text-ink">
              {profile?.skills || 'No skills added yet'}
            </div>
          </div>

          <div className="bg-white border border-ink/10 rounded-lg p-6 hover:border-ink/20 hover:-translate-y-0.5 transition-all">
            <Lightbulb className="text-gold mb-3" size={20} />
            <div className="text-xs uppercase tracking-wide text-sage font-medium mb-2">
              Interests
            </div>
            <div className="text-sm text-ink">
              {profile?.interests || 'No interests added yet'}
            </div>
          </div>
        </div>

        <div className="bg-ink rounded-lg p-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-paper text-xl font-serif-custom font-semibold mb-1">
              Ready for your next find?
            </h2>
            <p className="text-paper/70 text-sm">
              We'll match papers to your current profile.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/profile-setup')}
              className="border border-paper/30 text-paper text-sm font-medium rounded-md px-5 py-2.5 hover:bg-paper/10 transition-colors"
            >
              Edit profile
            </button>
            <button
              onClick={() => navigate('/recommendations')}
              className="flex items-center gap-1.5 bg-gold text-white text-sm font-medium rounded-md px-5 py-2.5 hover:bg-gold/90 transition-colors"
            >
              Get recommendations
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard