# Paleograph Manuscript Analyzer
An intelligent web application for analyzing, transcribing, and structuring text from historical manuscripts using Google's Gemini AI. The system handles complex layouts (tables, registers) and difficult handwriting with high precision.

## Code Style
- Use React 19 and Tailwind CSS v4.
- Use Vite as the build tool.
- Follow a utility-first styling approach with Tailwind.
- Use hook-based logic for complex workflows like image processing and AI analysis.
- Maintain a "Scholarly" and "Industrial Precision" aesthetic.

## Architecture
- **Local-First SPA:** Direct client-side integration with Gemini API via `@google/genai` SDK.
- **Ensemble OCR (Double Pass):** Multi-variant image analysis system (Original + Binarized + Dilated + Contrast) for improved recognition.
- **Structure Preservation:** Accurately reconstruct tables and lists in Markdown format using ASCII-style alignment.
- **Layout Intelligence:** Tooling for structural analysis returning JSON with bounding boxes.
- **Component Pattern:** Follow the structure: App -> Layout -> AnalysisDashboard -> ManuscriptViewer / TranscriptionPanel / ProcessingControls.

## Testing
- Focus on transcription accuracy metrics.
- Validate structure preservation (tables, registers) across different historical layouts.
- Test client-side image preprocessing performance.

## Security
- **Privacy First:** Process images locally via Canvas API.
- **API Safety:** Never commit API keys or secrets to version control.
- **Client-Side Validation:** Ensure robust handling of API responses and error states.
