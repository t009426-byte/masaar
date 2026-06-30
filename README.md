# مسار — Masaar

Kuwait university guidance app for high school graduates. Helps students discover the right college path based on their GPA, aptitude, and interests.

## Features

- **GPA Calculator** — Enter grades manually by stream (Science / Arts) or upload your high school certificate and enter your overall score. Shows qualifying colleges with expandable majors.
- **Aptitude Test** — 20-question RIASEC Holland Code personality test. Results show matched colleges with expandable majors.
- **College Explorer** — Browse all Kuwait universities and colleges with admission requirements, minimum scores, and English test requirements.
- **Deadlines** — Upcoming admission and scholarship deadlines.
- **Scholarships** — Overview of international scholarship destinations.
- **Auth** — Email/password sign-up and login via Supabase Auth. Certificate upload stored in Supabase Storage (private, per-user).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Auth & Storage | Supabase |
| Styling | Inline styles (no CSS framework) |
| Language | Arabic (RTL) |
| Hosting | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a **private** storage bucket named `certificates`
2. Add RLS policies scoped to each user's folder:
   - Condition: `(storage.foldername(name))[1] = auth.uid()::text`
   - Apply to: INSERT, SELECT, UPDATE, DELETE

## Project Structure

```
kharrij/
├── src/
│   ├── App.jsx        # All screens and data
│   └── supabase.js    # Supabase client + normalizeUser helper
├── .env.local         # Not committed — add your own
├── vite.config.js
└── package.json
```

## Data

All college and admission data lives in `App.jsx`:

- `INSTITUTIONS` — 8 Kuwait universities with colleges, majors, and admission conditions
- `APTITUDE_QUESTIONS` — 20 RIASEC questions
- `APTITUDE_RESULTS` — Holland Code profiles with college recommendations
- `SUBJECTS` — Subjects per stream (Science / Arts)
- `DATES` — Upcoming admission deadlines
- `SCHOLARSHIPS` — International scholarship info

## Build

```bash
npm run build   # output → dist/
```
