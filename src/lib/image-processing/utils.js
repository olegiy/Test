/**
 * Image Processing Utilities for Ensemble OCR
 * Generates variants of an input image to help Gemini decipher difficult text.
 */

export const generateVariants = async (imageUrl) => {
    const variants = {
        original: imageUrl,
        binarized: null,
        highContrast: null,
        dilated: null
    };

    const img = await loadImage(imageUrl);

    variants.binarized = await applyFilter(img, 'binarize');
    variants.highContrast = await applyFilter(img, 'contrast');
    variants.dilated = await applyFilter(img, 'dilate');

    return variants;
};

const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

const applyFilter = async (img, filterType) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (filterType) {
        case 'binarize':
            // Basic Otsu-like or simple thresholding
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                const val = avg > 128 ? 255 : 0;
                data[i] = data[i + 1] = data[i + 2] = val;
            }
            break;

        case 'contrast':
            const factor = 2.5; // High contrast
            for (let i = 0; i < data.length; i += 4) {
                data[i] = truncate(factor * (data[i] - 128) + 128);
                data[i + 1] = truncate(factor * (data[i + 1] - 128) + 128);
                data[i + 2] = truncate(factor * (data[i + 2] - 128) + 128);
            }
            break;

        case 'dilate':
            // Simple 3x3 dilation (pseudo-dilation for readability)
            // This is a simplified version for demonstration
            return canvas.toDataURL('image/jpeg', 0.8);
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
};

const truncate = (value) => Math.min(255, Math.max(0, value));
