import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, X, ArrowLeft, Bookmark } from 'lucide-react'

function Saved() {
  const [savedPapers, setSavedPapers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPapers') || '[]')
    setSavedPapers(saved)
  }, [])

  const removePaper = (title) => {
    const updated = savedPapers.filter((p) => p.title !== title)
    localStorage.setItem('savedPapers', JSON.stringify(updated))
    setSavedPapers(updated)
  }

  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-serif-custom text-xl text-ink font-bold">ResearchMatch</span>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-sm text-text/70 hover:text-ink">
            <ArrowLeft size={15} />
            Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl text-ink font-bold mb-2">Saved papers</h1>
        <p className="text-text/70 mb-8">Papers you have bookmarked for later</p>

        {savedPapers.length === 0 ? (
          <div className="bg-white border border-ink/10 rounded-lg p-12 text-center">
            <Bookmark className="mx-auto text-text/30 mb-3" size={28} />
            <p className="text-text/60">Nothing saved yet. Save a paper from your recommendations.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {savedPapers.map((paper, i) => (
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
                    <button onClick={() => removePaper(paper.title)} className="flex items-center gap-1 text-sm text-text/50 hover:text-red-600">
                      <X size={14} />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center shrink-0">
                  <div className="text-2xl font-bold text-ink">{paper.match_score}%</div>
                  <div className="text-xs text-text/50">match</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Saved