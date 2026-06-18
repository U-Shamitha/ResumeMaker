import { useState, useEffect, useRef } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { examples } from './examples'
import './App.css'

export default function App() {
  const [data, setData] = useState({
    name: '',
    title: '',
    contact: '',
    relocation: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
  })

  const [showNotification, setShowNotification] = useState('')
  const previewRef = useRef(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resume_data')
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved data:', e)
      }
    }
  }, [])

  const handleDataChange = (updates) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const handleNotification = (msg) => {
    setShowNotification(msg)
    setTimeout(() => setShowNotification(''), 2600)
  }

  const handleSave = () => {
    localStorage.setItem('resume_data', JSON.stringify(data))
    handleNotification('✓ Saved locally!')
  }

  const handleLoad = () => {
    const saved = localStorage.getItem('resume_data')
    if (!saved) {
      handleNotification('No saved data found')
      return
    }
    try {
      setData(JSON.parse(saved))
      handleNotification('✓ Loaded!')
    } catch (e) {
      handleNotification('Error loading data')
    }
  }

  const handleReset = () => {
    if (!confirm('Clear all fields?')) return
    setData({
      name: '', title: '', contact: '', summary: '',
      skills: [], experience: [], education: [],
    })
    localStorage.removeItem('resume_data')
    handleNotification('✓ Cleared!')
  }

  const handleExportPDF = () => {
    if (!previewRef.current) return
    const html2pdf = window.html2pdf
    if (!html2pdf) {
      handleNotification('PDF library not loaded')
      return
    }
    html2pdf().set({
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      margin: [10, 10, 10, 10],
    }).from(previewRef.current).save('resume.pdf')
    handleNotification('✓ PDF downloaded!')
  }

  const handleLoadExample = (exampleKey) => {
    const example = examples[exampleKey]
    if (!example) return
    setData(structuredClone(example))
    handleNotification(`✓ Loaded ${exampleKey.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
  }

  return (
    <div className="app">
      <header className="topbar">
        <span>Easy Resume Maker — Enter text, get formatted resume</span>
      </header>

      {showNotification && <div className="notification">{showNotification}</div>}

      <main className="container">
        <ResumeForm 
          data={data} 
          onChange={handleDataChange}
          onSave={handleSave}
          onLoad={handleLoad}
          onReset={handleReset}
          onExportPDF={handleExportPDF}
          onLoadExample={handleLoadExample}
        />
        <ResumePreview data={data} onChange={handleDataChange} ref={previewRef} />
      </main>
    </div>
  )
}
