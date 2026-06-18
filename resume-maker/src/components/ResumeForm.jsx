import { useState } from 'react'
import TextInput from './TextInput'
import ListEditor from './ListEditor'
import './ResumeForm.css'

export default function ResumeForm({ data, onChange, onSave, onLoad, onReset, onExportPDF, onLoadExample }) {
  const [skillInput, setSkillInput] = useState('')

  const handleBasicChange = (e) => {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  const handleAddSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed) {
      onChange({ skills: [...data.skills, trimmed] })
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (index) => {
    onChange({
      skills: data.skills.filter((_, i) => i !== index)
    })
  }

  const handleUpdateSkill = (index, value) => {
    const updated = [...data.skills]
    updated[index] = value
    onChange({ skills: updated })
  }

  const handleUpdateExperience = (updated) => {
    onChange({ experience: updated })
  }

  const handleUpdateEducation = (updated) => {
    onChange({ education: updated })
  }

  return (
    <section className="editor">
      <div className="examples-section">
        <label>📋 Load Example</label>
        <div className="examples-buttons">
          <button type="button" className="btn btn-secondary" onClick={() => onLoadExample('fullStackDev')}>Dev</button>
          <button type="button" className="btn btn-secondary" onClick={() => onLoadExample('productManager')}>PM</button>
          <button type="button" className="btn btn-secondary" onClick={() => onLoadExample('marketingDirector')}>Marketing</button>
          <button type="button" className="btn btn-secondary" onClick={() => onLoadExample('blank')}>Blank</button>
        </div>
      </div>

      <form>
        {/* Header Section */}
        <div className="form-section">
          <div className="section-title">👤 Personal Info</div>
          <TextInput label="Full Name" name="name" value={data.name} onChange={handleBasicChange} placeholder="Your name" />
          <TextInput label="Professional Title" name="title" value={data.title} onChange={handleBasicChange} placeholder="e.g. Senior Software Engineer" />
          <TextInput label="Contact Info" name="contact" value={data.contact} onChange={handleBasicChange} placeholder="City · email · phone · links" />
          <TextInput label="Willing to Relocate" name="relocation" value={data.relocation} onChange={handleBasicChange} placeholder="e.g. NYC, Boston, Remote" />
        </div>

        {/* Summary Section */}
        <div className="form-section">
          <div className="section-title">📝 Summary</div>
          <div className="form-group">
            <textarea 
              name="summary" 
              value={data.summary} 
              onChange={handleBasicChange}
              rows="3"
              placeholder="Brief professional summary (2-3 sentences)"
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="form-section">
          <div className="section-title">🎯 Skills</div>
          <ul className="items">
            {data.skills.map((skill, i) => (
              <li key={i} className="item">
                <input 
                  value={skill}
                  onChange={(e) => handleUpdateSkill(i, e.target.value)}
                  placeholder="Enter a skill"
                />
                <button type="button" title="Remove skill" onClick={() => handleRemoveSkill(i)}>✕</button>
              </li>
            ))}
          </ul>
          <div className="list-actions">
            <input 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              placeholder="Add a skill (press Enter)"
            />
            <button type="button" onClick={handleAddSkill}>Add</button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="form-section">
          <div className="section-title">💼 Experience</div>
          <p style={{margin: '0 0 8px 0', fontSize: '11px', color: '#666'}}>Click to expand/collapse. Drag to reorder.</p>
          <ListEditor 
            items={data.experience}
            onChange={handleUpdateExperience}
            template={{
              role: 'Job Title',
              company: 'Company Name',
              location: 'Location',
              dates: 'Dates (e.g. 2020-2021)',
              description: 'Description & key achievements',
            }}
          />
        </div>

        {/* Education Section */}
        <div className="form-section">
          <div className="section-title">🎓 Education</div>
          <p style={{margin: '0 0 8px 0', fontSize: '11px', color: '#666'}}>Click to expand/collapse. Drag to reorder.</p>
          <ListEditor 
            items={data.education}
            onChange={handleUpdateEducation}
            template={{
              degree: 'Degree (e.g. B.Tech)',
              school: 'School / College',
              city: 'City',
              dates: 'Year / Graduation Date',
              note: 'GPA / Additional Info',
            }}
          />
        </div>

        {/* Actions */}
        <div className="actions">
          <button type="button" onClick={onSave} className="btn" title="Save to browser storage">💾 Save</button>
          <button type="button" onClick={onLoad} className="btn" title="Load from browser storage">📂 Load</button>
          <button type="button" onClick={onExportPDF} className="btn" title="Download as PDF">📥 PDF</button>
          <button type="button" onClick={onReset} className="btn btn-danger" title="Clear all fields">🔄 Reset</button>
        </div>
      </form>
    </section>
  )
}
