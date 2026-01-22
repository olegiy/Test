# Image Processing Guidelines

This directory handles client-side image manipulation for OCR enhancement.

## Core Variants
Every manuscript page should be processed into:
1. **Original:** Untouched high-res image.
2. **Binarized:** Black and white extraction to clarify ink marks.
3. **Dilated:** Thickening of faint scripts for better character recognition.
4. **Contrast Overlay:** Enhanced contrast for faded parchment.

## Implementation Rules
- Use Browser Canvas API for performance.
- Avoid blocking the UI thread; use Web Workers if processing large images.
- Results should be passed to the Gemini lib as part of the double-pass analysis system.
