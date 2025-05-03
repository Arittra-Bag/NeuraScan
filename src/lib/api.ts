// API utility functions for communicating with the backend

interface AnalysisResult {
  class: string;
  confidence: number;
}

/**
 * Analyzes an MRI scan image using the backend API
 * @param imageData - The image data as a base64 string or Blob
 * @returns The analysis result from the backend
 */
export async function analyzeMRIScan(imageData: string | Blob): Promise<AnalysisResult[]> {
  try {
    // Convert Blob to base64 if needed
    let base64Image = imageData;
    if (imageData instanceof Blob) {
      base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageData);
      });
    }

    const response = await fetch('https://cortex-visual-insight.onrender.com/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error analyzing MRI scan:', error);
    throw error;
  }
} 