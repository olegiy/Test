# Technology Stack: Paleograph Manuscript Analyzer

## Core Technologies
- **Frontend Framework:** React 19 (using the latest features).
- **Build Tool:** Vite (for fast development and bundling).
- **Styling:** Tailwind CSS v4 (leveraging the latest design system capabilities).
- **AI Model:** Google Gemini 3.0 Pro (Preview) - specifically chosen for its advanced multi-modal capabilities and historical text understanding.
- **AI SDK:** `@google/genai` (direct client-side integration).

## Development Setup
- **Node.js:** Required for local development.
- **Local-First:** Designed to run without a heavy backend, utilizing client-side processing.
- **Image Processing:** Browser Canvas API for generating ensemble OCR variants (Binarized, Dilated, Contrast).

## Technical Constraints
- **Client-Side Limits:** Large image processing must be optimized to avoid UI blocking.
- **API Quotas:** Intelligent management of Gemini API calls, especially for the double-pass analysis.
- **Privacy:** Since it's local-first, sensitive manuscripts are processed primarily in the user's environment before being sent to the AI API.

## Dependencies (Planned)
- `react`, `react-dom` (v19)
- `tailwindcss` (v4)
- `@google/genai`
- `lucide-react` (for iconography)
- `framer-motion` (for smooth premium animations)
