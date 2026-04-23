# Candidate Dashboard

A React + TypeScript dashboard for reviewing, scoring, and comparing hiring candidates. Built with a dark UI, real-time score editing, and priority-based filtering.

## Features

- **Live Score Editing** — Adjust candidate assignment scores via sliders without disrupting the sort order mid-drag
- **Priority System** — Candidates are automatically classified into P0–P3 based on a priority engine
- **Search & Filter** — Search by name and filter by minimum assignment score
- **Sort Controls** — Sort by priority or assignment score in ascending or descending order
- **Compare Mode** — Select up to 3 candidates to view a side-by-side comparison panel
- **Candidate Modal** — Click any row to open a detailed view of the candidate's scores
- **Summary Panel** — Live count of total candidates broken down by priority tier

## Tech Stack

- React 18
- TypeScript
- Context API + useReducer for global state
- CSS-in-JS (inline styles + injected style tags)
- Google Fonts: Syne, DM Mono

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
└── App.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

## Priority Levels

| Level | Label | Color |
|-------|-------|-------|
| P0 | Interview Immediately | Green |
| P1 | Strong Shortlist | Purple |
| P2 | Review Later | Amber |
| P3 | Reject | Red |

## Slider Behavior

When a slider is dragged, the list order is frozen until the user releases the slider. The score number and priority badge update live during dragging. Once released, the list re-sorts based on the new score.
