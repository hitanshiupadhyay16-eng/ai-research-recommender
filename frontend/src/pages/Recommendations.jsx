import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Bookmark, BookmarkCheck, ArrowLeft } from 'lucide-react'

function Recommendations() {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savedTitles, setSavedTitles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPapers') || '[]')
    setSavedTitles(saved.map((p) => p.title))
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    const profile = JSON.parse(localStorage.getItem('profile') || 'null')

    if (!profile) {
      setError('Please complete your profile first.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/recommend-live?top_n=6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Could not fetch recommendations')
      }

      setRecommendations(data.recommendations)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleSave = (paper) => {
    const saved = JSON.parse(localStorage.getItem('savedPapers') || '[]')
    const alreadySaved = saved.some((p) => p.title === paper.title)
    let updated

    if (alreadySaved) {
      updated = saved.filter((p) => p.title !== paper.title)
    } else {
      updated = [...saved, paper]
    }

    localStorage.setItem('savedPapers', JSON.stringify(updated))
    setSavedTitles(updated.map((p) => p.title))
  }

  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-serif-custom text-xl text-ink font-bold">ResearchMatch</span>
          <div className="flex gap-4">
            <button onClick={() => navigate('/saved')} className="flex items-center gap-1 text-sm text-text/70 hover:text-ink">
              <Bookmark size={15} />
              Saved
            </button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-sm text-text/70 hover:text-ink">
              <ArrowLeft size={15} />
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl text-ink font-bold mb-2">Your recommendations</h1>
        <p className="text-text/70 mb-8">Based on your skills, interests, and goals</p>

        {loading && <p className="text-text/60">Finding papers that match you...</p>}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-5">
            {recommendations.map((paper, i) => {
              const isSaved = savedTitles.includes(paper.title)
              return (
                <div key={i} className="bg-white border border-ink/10 rounded-lg p-6 flex justify-between items-start gap-6 hover:border-ink/20 transition-all">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-sage font-medium">
                      {paper.category}
                    </span>
                    <h2 className="font-serif-custom text-lg text-ink font-semibold mt-1 mb-2">
                      {paper.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <a href={paper.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-gold hover:underline">
                        Read paper
                        <ExternalLink size={13} />
                      </a>
                      <button onClick={() => toggleSave(paper)} className="flex items-center gap-1 text-sm font-medium text-text/50 hover:text-ink">
                        {isSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="text-2xl font-bold text-ink">{paper.match_score}%</div>
                    <div className="text-xs text-text/50">match</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommendations