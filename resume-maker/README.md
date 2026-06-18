# Easy Resume Maker (React)

A modern, reusable resume builder with live preview, localStorage persistence, and PDF export.

## Quick Start

### Prerequisites

- **Node.js** (v14+) and **npm** installed

### Installation & Run

```bash
cd resume-maker
npm install
npm run dev
```

This opens the app in your browser (usually `http://localhost:3000`).

## Files & Structure

```
src/
  ├── main.jsx              # React entry point
  ├── App.jsx               # Main app state & logic
  ├── App.css               # App layout styles
  ├── index.css             # Global styles
  └── components/
      ├── ResumeForm.jsx    # Form editor
      ├── ResumeForm.css    # Form styles
      ├── ResumePreview.jsx # Live preview
      ├── ResumePreview.css # Preview styles
      ├── TextInput.jsx     # Reusable text input
      └── ListEditor.jsx    # Reusable list editor
package.json               # Dependencies & scripts
vite.config.js            # Vite config
index.html                # HTML entry point
```

## Features

✓ **Live Preview** — Edit text, see updates instantly  
✓ **Reusable Components** — TextInput, ListEditor for easy extension  
✓ **Multiple Sections** — Name, title, contact, summary, skills, experience, education  
✓ **Dynamic Lists** — Add/remove skills, experience, education entries  
✓ **Save/Load** — Uses browser `localStorage` for persistence  
✓ **Export PDF** — Single-click PDF download (uses html2pdf CDN)  
✓ **Professional Design** — Clean, print-friendly layout

## Usage

1. **Fill the form** on the left with your resume details
2. **See live preview** on the right as you type
3. **Add sections** using the "+ Add" buttons for experience and education
4. **Save locally** — Click "Save" to store in browser storage
5. **Export PDF** — Click "Export PDF" to download a formatted resume
6. **Load saved data** — Click "Load" to restore a previously saved resume
7. **Reset** — Clear all fields and start fresh

## Customization

To modify the resume template:

- Edit `src/components/ResumePreview.jsx` for structure
- Edit `src/components/ResumePreview.css` for styling
- Add new fields in `App.jsx` state and `ResumeForm.jsx` form

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Deploy any of those files to a static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Notes

- Data persists in your browser's `localStorage` — clearing browser data will erase saved resumes
- For production use, consider:
  - Server-side storage with user authentication
  - Database integration (Firebase, MongoDB, PostgreSQL)
  - Additional templates & themes
  - Document versioning

- You can adapt the preview template in `app.js` to match your preferred formatting or the original HTML sample.
