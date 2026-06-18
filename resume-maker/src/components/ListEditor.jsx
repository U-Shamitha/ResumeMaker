import { useState } from 'react'
import './ListEditor.css'

export default function ListEditor({ items, onChange, template }) {
  const keys = Object.keys(template)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(null)

  const addItem = () => {
    const newItem = {}
    keys.forEach(k => newItem[k] = '')
    onChange([...items, newItem])
    setExpandedIndex(items.length)
  }

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index))
    if (expandedIndex === index) setExpandedIndex(null)
  }

  const updateItem = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value
    onChange(updated)
  }

  const moveItem = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= items.length) return
    const updated = [...items]
    const [item] = updated.splice(fromIdx, 1)
    updated.splice(toIdx, 0, item)
    onChange(updated)
    setExpandedIndex(toIdx)
  }

  const getPreview = (item, index) => {
    // Show the main field(s) as preview
    const mainFields = keys.slice(0, 2)
    return mainFields.map(k => item[k] || '').filter(Boolean).join(' · ') || `Item ${index + 1}`
  }

  return (
    <div className="list-editor">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className={`list-item ${expandedIndex === idx ? 'expanded' : ''}`}
          draggable
          onDragStart={() => setDraggedIndex(idx)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => moveItem(draggedIndex, idx)}
          onDragEnd={() => setDraggedIndex(null)}
        >
          <div 
            className="list-item-header"
            onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          >
            <span className="drag-handle">⋮⋮</span>
            <span className="preview">{getPreview(item, idx)}</span>
            <span className={`toggle ${expandedIndex === idx ? 'open' : ''}`}>▼</span>
          </div>

          {expandedIndex === idx && (
            <div className="list-item-body">
              {keys.map(key => (
                <div key={key} className="form-row">
                  <label>{template[key]}</label>
                  {key.toLowerCase().includes('description') || key.toLowerCase().includes('note') ? (
                    key === 'description' || key === 'Description' ? (
                      <textarea
                        value={item[key] || ''}
                        onChange={(e) => updateItem(idx, key, e.target.value)}
                        placeholder={template[key]}
                        rows="2"
                      />
                    ) : (
                      <input
                        type="text"
                        value={item[key] || ''}
                        onChange={(e) => updateItem(idx, key, e.target.value)}
                        placeholder={template[key]}
                      />
                    )
                  ) : (
                    <input
                      type="text"
                      value={item[key] || ''}
                      onChange={(e) => updateItem(idx, key, e.target.value)}
                      placeholder={template[key]}
                    />
                  )}
                </div>
              ))}
              <button type="button" className="btn-remove" onClick={() => removeItem(idx)}>
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <button type="button" className="btn-add-item" onClick={addItem}>
        + Add {template.role ? 'Experience' : 'Education'}
      </button>
    </div>
  )
}

