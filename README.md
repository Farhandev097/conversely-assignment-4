# Candidate Dashboard

A React + TypeScript dashboard for reviewing, scoring, and comparing hiring candidates. Built with a dark UI, Tailwind CSS v3, and real-time score editing.

## Features

- **Live Score Editing** — Adjust candidate assignment scores via sliders without disrupting sort order mid-drag
- **Priority System** — Candidates are automatically classified into P0–P3 based on a priority engine
- **Search & Filter** — Search by name and filter by minimum assignment score
- **Sort Controls** — Sort by priority or assignment score in ascending or descending order
- **Compare Mode** — Select up to 3 candidates for a side-by-side comparison panel
- **Candidate Modal** — Click any row to open a detailed score breakdown
- **Summary Panel** — Live count of total candidates broken down by priority tier

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS v3
- PostCSS + Autoprefixer
- Context API + useReducer
- Google Fonts: Syne, DM Mono
- Vite

## Project Structure

```
src/
├── components/
│   ├── CandidateModal.tsx
│   ├── CandidateRow.tsx
│   ├── CandidateTable.tsx
│   ├── ComparePanel.tsx
│   ├── FilterBar.tsx
│   ├── SearchBar.tsx
│   └── SummaryPanel.tsx
├── context/
│   └── CandidateContext.tsx
├── data/
│   └── candidates.ts
├── types/
│   └── Candidate.ts
├── utils/
│   └── priorityEngine.ts
├── App.tsx
├── main.tsx
└── index.css
tailwind.config.js
postcss.config.js
```

## Getting Started

```bash
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

## Tailwind Config

The project uses a custom Tailwind theme. Make sure `tailwind.config.js` has:

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d0f14",
        surface: "#14171f",
        surface2: "#1c2030",
        border: "#252a38",
        muted: "#6b7280",
        accent: "#6ee7b7",
        accent2: "#818cf8",
        p0: "#6ee7b7",
        p1: "#818cf8",
        p2: "#fbbf24",
        p3: "#f87171",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
```

## Priority Levels

| Level | Label | Color |
|-------|-------|-------|
| P0 | Interview Immediately | Green |
| P1 | Strong Shortlist | Purple |
| P2 | Review Later | Amber |
| P3 | Reject | Red |

## Slider Behavior

When a slider is dragged, the list order freezes until the user releases. The score number and priority badge update live during dragging. On release, the list re-sorts based on the new score.