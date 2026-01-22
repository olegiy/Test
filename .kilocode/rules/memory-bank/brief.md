# Project Brief: Paleograph Manuscript Analyzer

## Core Requirement
Develop an intelligent web application for analyzing, transcribing, and structuring text from historical manuscripts using Google's Gemini AI. The system must handle complex layouts (tables, registers) and difficult handwriting with high precision.

## Goals
- **High-Accuracy Transcription:** Leverage Gemini 3.0 Pro (Preview) models to decipher handwritten historical texts.
- **Ensemble OCR (Double Pass):** Implement a multi-variant analysis system (Original + Binarized + Dilated + Contrast) to improve recognition of faint or damaged text.
- **Structure Preservation:** Accurately reconstruct tables and lists in Markdown format using ASCII-style alignment.
- **Layout Intelligence:** Provide tools for structural analysis returning JSON with bounding boxes for document elements.
- **Local-First Architecture:** Ensure the application can run locally via Docker or Node.js with minimal setup.

## Scope
- **Frontend:** Single-page application (SPA) built with React 19, Vite, and Tailwind CSS v4.
- **AI Integration:** Direct client-side integration with Google Gemini API via `@google/genai` SDK.
- **Processing:** Client-side image preprocessing (Canvas API) for generating analysis variants.
- **Export:** Capabilities to export analysis results as Markdown and HTML.
