import { forwardRef, useState } from 'react'
import './ResumePreview.css'

const ResumePreview = forwardRef(function ResumePreview({ data, onChange }, ref) {
  const [draggedItem, setDraggedItem] = useState(null)

  const handleBlur = (field, value) => {
    if (onChange) onChange({ [field]: value })
  }

  // Drag handlers for skills
  const handleSkillDragStart = (e, index) => {
    setDraggedItem({ type: 'skill', index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleSkillDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleSkillDrop = (e, dropIndex) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.type !== 'skill') return
    
    const dragIndex = draggedItem.index
    if (dragIndex === dropIndex) {
      setDraggedItem(null)
      return
    }

    const updated = [...data.skills]
    const [draggedSkill] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedSkill)
    if (onChange) onChange({ skills: updated })
    setDraggedItem(null)
  }

  // Drag handlers for experience
  const handleExpDragStart = (e, index) => {
    setDraggedItem({ type: 'exp', index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleExpDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleExpDrop = (e, dropIndex) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.type !== 'exp') return
    
    const dragIndex = draggedItem.index
    if (dragIndex === dropIndex) {
      setDraggedItem(null)
      return
    }

    const updated = [...data.experience]
    const [draggedExp] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedExp)
    if (onChange) onChange({ experience: updated })
    setDraggedItem(null)
  }

  // Drag handlers for education
  const handleEduDragStart = (e, index) => {
    setDraggedItem({ type: 'edu', index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleEduDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleEduDrop = (e, dropIndex) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.type !== 'edu') return
    
    const dragIndex = draggedItem.index
    if (dragIndex === dropIndex) {
      setDraggedItem(null)
      return
    }

    const updated = [...data.education]
    const [draggedEdu] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedEdu)
    if (onChange) onChange({ education: updated })
    setDraggedItem(null)
  }

  // Drag handlers for projects
  const handleProjectDragStart = (e, index) => {
    setDraggedItem({ type: 'proj', index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleProjectDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleProjectDrop = (e, dropIndex) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.type !== 'proj') return
    
    const dragIndex = draggedItem.index
    if (dragIndex === dropIndex) {
      setDraggedItem(null)
      return
    }

    const updated = [...data.projects]
    const [draggedProj] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedProj)
    if (onChange) onChange({ projects: updated })
    setDraggedItem(null)
  }

  // Drag handlers for certifications
  const handleCertDragStart = (e, index) => {
    setDraggedItem({ type: 'cert', index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleCertDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleCertDrop = (e, dropIndex) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.type !== 'cert') return
    
    const dragIndex = draggedItem.index
    if (dragIndex === dropIndex) {
      setDraggedItem(null)
      return
    }

    const updated = [...data.certifications]
    const [draggedCert] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedCert)
    if (onChange) onChange({ certifications: updated })
    setDraggedItem(null)
  }

  // Drag handlers for languages
  const handleLangDragStart = (e, index) => {
    setDraggedItem({ type: 'lang', index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleLangDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleLangDrop = (e, dropIndex) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.type !== 'lang') return
    
    const dragIndex = draggedItem.index
    if (dragIndex === dropIndex) {
      setDraggedItem(null)
      return
    }

    const updated = [...data.languages]
    const [draggedLang] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedLang)
    if (onChange) onChange({ languages: updated })
    setDraggedItem(null)
  }

  const handleSkillChange = (index, value) => {
    if (value === null) {
      // Delete skill
      const updated = data.skills.filter((_, i) => i !== index)
      if (onChange) onChange({ skills: updated })
    } else {
      const updated = [...data.skills]
      updated[index] = value
      if (onChange) onChange({ skills: updated })
    }
  }

  const handleExpChange = (index, field, value) => {
    const updated = [...data.experience]
    updated[index] = { ...updated[index], [field]: value }
    if (onChange) onChange({ experience: updated })
  }

  const handleEduChange = (index, field, value) => {
    const updated = [...data.education]
    updated[index] = { ...updated[index], [field]: value }
    if (onChange) onChange({ education: updated })
  }

  return (
    <section className="preview">
      <div ref={ref} className="resume">
        {/* Header */}
        <div className="res-header">
          <div 
            className="res-name editable" 
            contentEditable 
            onBlur={(e) => handleBlur('name', e.currentTarget.textContent)}
          >
            {data.name || 'Your Name'}
          </div>
          {data.title && (
            <div 
              className="res-title editable" 
              contentEditable 
              onBlur={(e) => handleBlur('title', e.currentTarget.textContent)}
            >
              {data.title}
            </div>
          )}
          {data.contact && (
            <div 
              className="res-contact editable" 
              contentEditable 
              onBlur={(e) => handleBlur('contact', e.currentTarget.textContent)}
            >
              {data.contact}
            </div>
          )}
          {data.relocation && (
            <div 
              className="res-relocation editable" 
              contentEditable 
              onBlur={(e) => handleBlur('relocation', e.currentTarget.textContent)}
            >
              📍 Willing to relocate: {data.relocation}
            </div>
          )}
        </div>

        {/* Summary */}
        {data.summary && (
          <section className="res-section">
            <h2 className="editable" contentEditable onBlur={(e) => {}} title="Click to edit">Summary</h2>
            <p 
              className="editable"
              contentEditable 
              onBlur={(e) => handleBlur('summary', e.currentTarget.textContent)}
            >
              {data.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="res-section">
            <h2 title="Click to edit">Skills</h2>
            <div className="skills-list">
              {data.skills.map((skill, i) => (
                <div 
                  key={i} 
                  className={`skill-item ${draggedItem?.type === 'skill' && draggedItem?.index === i ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleSkillDragStart(e, i)}
                  onDragOver={handleSkillDragOver}
                  onDrop={(e) => handleSkillDrop(e, i)}
                  onDragEnd={() => setDraggedItem(null)}
                >
                  <span 
                    className="skill-pill editable"
                    contentEditable 
                    onBlur={(e) => handleSkillChange(i, e.currentTarget.textContent)}
                  >
                    {skill}
                  </span>
                  <button 
                    className="btn-delete-mini"
                    onClick={() => handleSkillChange(i, null)}
                    title="Delete skill"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button 
              className="btn-add-mini"
              onClick={() => onChange({ skills: [...data.skills, 'New skill'] })}
              title="Add new skill"
            >
              + Add Skill
            </button>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="res-section">
            <h2 title="Click to edit">Experience</h2>
            {data.experience.map((exp, i) => (
              <div 
                key={i} 
                className={`exp-entry-wrapper ${draggedItem?.type === 'exp' && draggedItem?.index === i ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleExpDragStart(e, i)}
                onDragOver={handleExpDragOver}
                onDrop={(e) => handleExpDrop(e, i)}
                onDragEnd={() => setDraggedItem(null)}
              >
                <div className="exp-entry">
                  <div className="exp-header">
                    <div>
                      {exp.role && (
                        <span 
                          className="exp-role editable" 
                          contentEditable 
                          onBlur={(e) => handleExpChange(i, 'role', e.currentTarget.textContent)}
                        >
                          {exp.role}
                        </span>
                      )}
                      {exp.company && (
                        <>
                          <span className="exp-company"> / </span>
                          <span 
                            className="exp-company editable"
                            contentEditable 
                            onBlur={(e) => handleExpChange(i, 'company', e.currentTarget.textContent)}
                          >
                            {exp.company}
                          </span>
                        </>
                      )}
                    </div>
                    <span 
                      className="exp-dates editable" 
                      contentEditable 
                      onBlur={(e) => handleExpChange(i, 'dates', e.currentTarget.textContent)}
                    >
                      {exp.dates}
                    </span>
                  </div>
                  {exp.location && (
                    <div 
                      className="exp-location editable"
                      contentEditable 
                      onBlur={(e) => handleExpChange(i, 'location', e.currentTarget.textContent)}
                    >
                      {exp.location}
                    </div>
                  )}
                  {exp.description && (
                    <div 
                      className="exp-desc editable"
                      contentEditable 
                      onBlur={(e) => handleExpChange(i, 'description', e.currentTarget.textContent)}
                    >
                      {exp.description}
                    </div>
                  )}
                </div>
                <button 
                  className="btn-delete-entry"
                  onClick={() => onChange({ experience: data.experience.filter((_, idx) => idx !== i) })}
                  title="Delete entry"
                >
                  ✕ Delete
                </button>
              </div>
            ))}
            <button 
              className="btn-add-mini"
              onClick={() => onChange({ experience: [...data.experience, { role: '', company: '', location: '', dates: '', description: '' }] })}
              title="Add new experience"
            >
              + Add Experience
            </button>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="res-section">
            <h2 title="Click to edit">Education</h2>
            {data.education.map((edu, i) => (
              <div 
                key={i} 
                className={`edu-entry-wrapper ${draggedItem?.type === 'edu' && draggedItem?.index === i ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleEduDragStart(e, i)}
                onDragOver={handleEduDragOver}
                onDrop={(e) => handleEduDrop(e, i)}
                onDragEnd={() => setDraggedItem(null)}
              >
                <div className="edu-entry">
                  <div className="edu-header">
                    <div>
                      {edu.degree && (
                        <span 
                          className="edu-degree editable" 
                          contentEditable 
                          onBlur={(e) => handleEduChange(i, 'degree', e.currentTarget.textContent)}
                        >
                          {edu.degree}
                        </span>
                      )}
                    </div>
                    {edu.dates && (
                      <span 
                        className="edu-dates editable" 
                        contentEditable 
                        onBlur={(e) => handleEduChange(i, 'dates', e.currentTarget.textContent)}
                      >
                        {edu.dates}
                      </span>
                    )}
                  </div>
                  <div>
                    {edu.school && (
                      <span 
                        className="editable"
                        contentEditable 
                        onBlur={(e) => handleEduChange(i, 'school', e.currentTarget.textContent)}
                      >
                        {edu.school}
                      </span>
                    )}
                    {edu.city && (
                      <>
                        <span> — </span>
                        <span 
                          className="editable"
                          contentEditable 
                          onBlur={(e) => handleEduChange(i, 'city', e.currentTarget.textContent)}
                        >
                          {edu.city}
                        </span>
                      </>
                    )}
                  </div>
                  {edu.note && (
                    <div 
                      className="edu-note editable"
                      contentEditable 
                      onBlur={(e) => handleEduChange(i, 'note', e.currentTarget.textContent)}
                    >
                      {edu.note}
                    </div>
                  )}
                </div>
                <button 
                  className="btn-delete-entry"
                  onClick={() => onChange({ education: data.education.filter((_, idx) => idx !== i) })}
                  title="Delete entry"
                >
                  ✕ Delete
                </button>
              </div>
            ))}
            <button 
              className="btn-add-mini"
              onClick={() => onChange({ education: [...data.education, { degree: '', school: '', city: '', dates: '', note: '' }] })}
              title="Add new education"
            >
              + Add Education
            </button>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="res-section">
            <h2 title="Click to edit">Projects</h2>
            {data.projects.map((proj, i) => (
              <div 
                key={i} 
                className={`proj-entry-wrapper ${draggedItem?.type === 'proj' && draggedItem?.index === i ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleProjectDragStart(e, i)}
                onDragOver={handleProjectDragOver}
                onDrop={(e) => handleProjectDrop(e, i)}
                onDragEnd={() => setDraggedItem(null)}
              >
                <div className="proj-entry">
                  {proj.name && (
                    <div 
                      className="proj-name editable"
                      contentEditable 
                      onBlur={(e) => {
                        const updated = [...data.projects]
                        updated[i] = { ...updated[i], name: e.currentTarget.textContent }
                        onChange({ projects: updated })
                      }}
                    >
                      {proj.name}
                    </div>
                  )}
                  {proj.description && (
                    <div 
                      className="proj-desc editable"
                      contentEditable 
                      onBlur={(e) => {
                        const updated = [...data.projects]
                        updated[i] = { ...updated[i], description: e.currentTarget.textContent }
                        onChange({ projects: updated })
                      }}
                    >
                      {proj.description}
                    </div>
                  )}
                  {proj.tags && (
                    <div 
                      className="proj-tags editable"
                      contentEditable 
                      onBlur={(e) => {
                        const updated = [...data.projects]
                        updated[i] = { ...updated[i], tags: e.currentTarget.textContent }
                        onChange({ projects: updated })
                      }}
                    >
                      {proj.tags}
                    </div>
                  )}
                </div>
                <button 
                  className="btn-delete-entry"
                  onClick={() => onChange({ projects: data.projects.filter((_, idx) => idx !== i) })}
                  title="Delete project"
                >
                  ✕ Delete
                </button>
              </div>
            ))}
            <button 
              className="btn-add-mini"
              onClick={() => onChange({ projects: [...data.projects, { name: 'Project Name', description: 'Description', tags: 'Tags' }] })}
              title="Add new project"
            >
              + Add Project
            </button>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="res-section">
            <h2 title="Click to edit">Certifications</h2>
            {data.certifications.map((cert, i) => (
              <div 
                key={i} 
                className={`cert-item ${draggedItem?.type === 'cert' && draggedItem?.index === i ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleCertDragStart(e, i)}
                onDragOver={handleCertDragOver}
                onDrop={(e) => handleCertDrop(e, i)}
                onDragEnd={() => setDraggedItem(null)}
              >
                <span 
                  className="cert-text editable"
                  contentEditable 
                  onBlur={(e) => {
                    const updated = [...data.certifications]
                    updated[i] = e.currentTarget.textContent
                    onChange({ certifications: updated })
                  }}
                >
                  {cert}
                </span>
                <button 
                  className="btn-delete-mini"
                  onClick={() => onChange({ certifications: data.certifications.filter((_, idx) => idx !== i) })}
                  title="Delete certification"
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              className="btn-add-mini"
              onClick={() => onChange({ certifications: [...data.certifications, 'Certification Name'] })}
              title="Add new certification"
            >
              + Add Certification
            </button>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="res-section">
            <h2 title="Click to edit">Languages</h2>
            {data.languages.map((lang, i) => (
              <div 
                key={i} 
                className={`lang-item ${draggedItem?.type === 'lang' && draggedItem?.index === i ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleLangDragStart(e, i)}
                onDragOver={handleLangDragOver}
                onDrop={(e) => handleLangDrop(e, i)}
                onDragEnd={() => setDraggedItem(null)}
              >
                <div className="lang-content">
                  <span 
                    className="lang-name editable"
                    contentEditable 
                    onBlur={(e) => {
                      const updated = [...data.languages]
                      updated[i] = { ...updated[i], name: e.currentTarget.textContent }
                      onChange({ languages: updated })
                    }}
                  >
                    {lang.name}
                  </span>
                  <span 
                    className="lang-level editable"
                    contentEditable 
                    onBlur={(e) => {
                      const updated = [...data.languages]
                      updated[i] = { ...updated[i], level: e.currentTarget.textContent }
                      onChange({ languages: updated })
                    }}
                  >
                    {lang.level}
                  </span>
                </div>
                <button 
                  className="btn-delete-mini"
                  onClick={() => onChange({ languages: data.languages.filter((_, idx) => idx !== i) })}
                  title="Delete language"
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              className="btn-add-mini"
              onClick={() => onChange({ languages: [...data.languages, { name: 'Language', level: 'Proficiency' }] })}
              title="Add new language"
            >
              + Add Language
            </button>
          </section>
        )}
      </div>
    </section>
  )
})

export default ResumePreview
