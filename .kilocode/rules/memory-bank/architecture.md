# Architecture: Paleograph Manuscript Analyzer

## System Overview
The application follows a Local-First SPA architecture. It leverages the browser's capabilities for image processing and acts as an intelligent interface for the Gemini AI.

## Source Code Paths (Planned)
- `/src/components`: UI components (layout, buttons, image viewers).
- `/src/hooks`: Custom React hooks for API interaction and state management.
- `/src/lib/gemini`: Logic for interfacing with Gemini API, including prompt templates for transcription.
- `/src/lib/image-processing`: Utilities for generating the ensemble OCR variants (Double Pass system).
- `/src/styles`: CSS and Tailwind configuration.

## Key Technical Decisions
1. **Double Pass (Ensemble OCR):** Instead of sending a single image, the app sends multiple variants (Original, Binarized, etc.) to the AI. This overcomes physical degradation of manuscripts.
2. **ASCII-Style Alignment:** For table reconstruction, the AI is instructed to return text in Markdown with precise ASCII alignment to preserve visual structure during review.
3. **JSON Metadata:** Layout detection returns bounding boxes in JSON format, allowing the frontend to highlight regions of interest on the original manuscript.

## Design Patterns
- **Provider Pattern:** React Context for managing AI configuration and session state.
- **Utility-First Styling:** Extensive use of Tailwind CSS v4 for a premium, responsive UI.
- **Hook-Based Logic:** Encapsulating complex workflows (like image upload -> preprocess -> analyze) into clean hooks.

## Component Relationships
- `App` -> `Layout`
  - `ImageUploader` (Entry point)
  - `AnalysisDashboard` (Main workspace)
    - `ManuscriptViewer` (Interactive image layer)
    - `TranscriptionPanel` (Output and editor)
    - `ProcessingControls` (Adjusting OCR variants)
