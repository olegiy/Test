# Gemini Integration Guidelines

This directory contains the logic for interfacing with Google Gemini AI.

## Objectives
- Implement prompt templates that emphasize historical text deciphering.
- Ensure the AI returns Markdown with ASCII alignment for tables.
- Handle multi-modal inputs (ensemble variants) correctly.

## Data Structure
- AI responses should be parsed into structured JSON when requesting layout analysis or metadata.
- Transcriptions should favor accuracy over speed.

## Configuration
- Use environment variables for API keys.
- Manage rate limits and quotas intelligently, especially during batch processing.
