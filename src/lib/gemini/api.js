import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Double-Pass Analysis
 * Sends multiple image variants to Gemini for superior transcription.
 */
export const analyzeManuscript = async (variants) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using Flash for speed, can be upgraded to Pro

    const prompt = `
    You are an expert paleographer and historical researcher.
    I am providing you with multiple variants of the same manuscript page to help you decipher it:
    1. ORIGINAL: The raw scan.
    2. BINARIZED: Black and white thresholded to improve ink/paper separation.
    3. HIGH CONTRAST: Enhanced contrast to reveal faint lettering.

    TASK:
    1. Transcribe the text with extreme accuracy. 
    2. Preserve the structural layout (tables, lists) using ASCII-aligned Markdown.
    3. If there are tables, use pipes (|) and ensure columns are aligned.
    4. Provide the transcription in a clear Markdown block.
    5. Following the transcription, provide a JSON block with "layout_analysis" containing bounding boxes (normalized 0-1000) for major sections if possible.

    Be careful with historical abbreviations and archaic spellings. Do not modernize the text; transcribe it exactly as written.
  `;

    // Convert dataURIs to Gemini parts
    const imageParts = await Promise.all([
        fileToGenerativePart(variants.original, "image/jpeg"),
        fileToGenerativePart(variants.binarized, "image/jpeg"),
        fileToGenerativePart(variants.highContrast, "image/jpeg")
    ]);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
};

async function fileToGenerativePart(dataUri, mimeType) {
    const base64Data = dataUri.split(',')[1];
    return {
        inlineData: {
            data: base64Data,
            mimeType
        },
    };
}
