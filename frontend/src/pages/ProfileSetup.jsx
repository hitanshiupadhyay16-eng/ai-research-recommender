import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileSetup() {
  const [skills, setSkills] = useState('')
  const [interests, setInterests] = useState('')
  const [careerGoal, setCareerGoal] = useState('Research')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('profile') || 'null')
    if (existing) {
      setSkills(existing.skills || '')
      setInterests(existing.interests || '')
      setCareerGoal(existing.career_goal || 'Research')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const profile = { skills, interests, career_goal: careerGoal }
      localStorage.setItem('profile', JSON.stringify(profile))
      navigate('/dashboard')
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-ink font-bold mb-2">Tell us about yourself</h1>
          <p className="text-text/70">This helps us find research that actually fits you</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-lg p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Your skills</label>
            <input
              type="text"
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-ink/20 rounded-md px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              placeholder="Python, Machine Learning, SQL"
            />
            <p className="text-xs text-text/50 mt-1">Separate with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Your interests</label>
            <input
              type="text"
              required
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full border border-ink/20 rounded-md px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              placeholder="Natural Language Processing, Chatbots"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Career goal</label>
            <select
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full border border-ink/20 rounded-md px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
            >
              <option value="Research">Research</option>
              <option value="Industry">Industry</option>
              <option value="Startup">Startup</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper font-medium rounded-md py-2.5 hover:bg-ink/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save and continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileSetup