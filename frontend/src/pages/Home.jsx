import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sparkles, BookOpen, TrendingUp, RefreshCw } from 'lucide-react'

const demoInputs = [
  'Python, Deep Learning, Computer Vision',
  'JavaScript, React, Node.js',
  'SQL, Data Analysis, Statistics',
]

function Home() {
  const navigate = useNavigate()
  const [displayText, setDisplayText] = useState('')
  const [demoIndex, setDemoIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const currentText = demoInputs[demoIndex]
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 40)
      return () => clearTimeout(timeout)
    } else {
      const pause = setTimeout(() => {
        setCharIndex(0)
        setDemoIndex((demoIndex + 1) % demoInputs.length)
      }, 1800)
      return () => clearTimeout(pause)
    }
  }, [charIndex, demoIndex])

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="border-b border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-serif-custom text-xl text-ink font-bold">ResearchMatch</span>
          <div className="flex gap-3">
            <button onClick={() => navigate('/login')} className="text-sm text-ink font-medium px-4 py-2 hover:text-ink/70">
              Log in
            </button>
            <button onClick={() => navigate('/signup')} className="text-sm bg-ink text-paper font-medium rounded-md px-4 py-2 hover:bg-ink/90">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h1 className="text-4xl md:text-5xl text-ink font-bold leading-tight mb-6">
            Find the research that actually fits where you are
          </h1>
          <p className="text-lg text-text/70 mb-10">
            Tell us your skills and interests. We match you to relevant papers,
            project ideas, and emerging technologies — instead of you scrolling
            through hundreds of unrelated abstracts.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-gold text-white font-medium rounded-md px-6 py-3 hover:bg-gold/90 transition-colors"
          >
            Get started
          </button>

          <div className="mt-10 bg-white border border-ink/10 rounded-lg p-6 max-w-md">
            <div className="text-xs uppercase tracking-wide text-sage font-medium mb-3">
              Your skills
            </div>
            <div className="font-mono text-ink text-sm min-h-[1.5rem]">
              {displayText}
              <span className="animate-pulse">|</span>
            </div>
            <div className="mt-4 pt-4 border-t border-ink/10 flex items-center gap-2 text-sm text-text/60">
              <RefreshCw size={14} className="text-sage" />
              Matching papers in real time
            </div>
          </div>
        </div>

        <div
          className={`hidden md:block transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <svg viewBox="0 0 400 400" className="w-full h-auto">
            <line x1="200" y1="200" x2="90" y2="120" stroke="#1B2E28" strokeOpacity="0.15" strokeWidth="1.5" />
            <line x1="200" y1="200" x2="320" y2="100" stroke="#1B2E28" strokeOpacity="0.15" strokeWidth="1.5" />
            <line x1="200" y1="200" x2="330" y2="260" stroke="#1B2E28" strokeOpacity="0.15" strokeWidth="1.5" />
            <line x1="200" y1="200" x2="110" y2="300" stroke="#1B2E28" strokeOpacity="0.15" strokeWidth="1.5" />
            <line x1="200" y1="200" x2="230" y2="330" stroke="#1B2E28" strokeOpacity="0.15" strokeWidth="1.5" />
            <line x1="90" y1="120" x2="320" y2="100" stroke="#1B2E28" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="330" y1="260" x2="230" y2="330" stroke="#1B2E28" strokeOpacity="0.08" strokeWidth="1" />

            <circle cx="200" cy="200" r="26" fill="#B8862E" />
            <circle cx="90" cy="120" r="14" fill="#5C7A6E" />
            <circle cx="320" cy="100" r="10" fill="#1B2E28" fillOpacity="0.6" />
            <circle cx="330" cy="260" r="16" fill="#5C7A6E" />
            <circle cx="110" cy="300" r="10" fill="#1B2E28" fillOpacity="0.6" />
            <circle cx="230" cy="330" r="13" fill="#5C7A6E" />
          </svg>
        </div>
      </div>

      <div className="border-t border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <Sparkles className="text-gold mb-3" size={22} />
            <h3 className="font-serif-custom text-lg text-ink font-semibold mb-2">
              Personalized matches
            </h3>
            <p className="text-sm text-text/70">
              Recommendations are based on your actual skills and goals, not generic trending lists.
            </p>
          </div>
          <div>
            <BookOpen className="text-gold mb-3" size={22} />
            <h3 className="font-serif-custom text-lg text-ink font-semibold mb-2">
              Built on real papers
            </h3>
            <p className="text-sm text-text/70">
              We pull from arXiv and academic sources, covering ML, NLP, security, and more.
            </p>
          </div>
          <div>
            <TrendingUp className="text-gold mb-3" size={22} />
            <h3 className="font-serif-custom text-lg text-ink font-semibold mb-2">
              Grows with you
            </h3>
            <p className="text-sm text-text/70">
              Update your profile anytime and get fresh recommendations that reflect where you are now.
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-ink/10 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center text-sm text-text/50">
          <span>ResearchMatch</span>
          <span>Built for students, by students</span>
        </div>
      </footer>
    </div>
  )
}

export default Home