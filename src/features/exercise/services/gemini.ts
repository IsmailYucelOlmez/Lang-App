import { GoogleGenAI } from '@google/genai';
import { rateLimitTracker } from './rateLimitTracker';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: API_KEY});

export const getGeminiResponse = async (prompt: string, retryCount = 0): Promise<string> => {
  const maxRetries = 3;
  
  // Check rate limit before making request
  if (!rateLimitTracker.canMakeRequest()) {
    throw new Error(rateLimitTracker.getStatusMessage());
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    
    // Record successful request
    rateLimitTracker.recordRequest();
    
    return response.text || '';
  } catch (error: unknown) {
    // Type guard to check if error has the expected structure
    const isGeminiError = (err: unknown): err is { 
      code?: number; 
      status?: string; 
      message?: string; 
      details?: Array<{ '@type': string; retryDelay?: string }> 
    } => {
      return typeof err === 'object' && err !== null;
    };

    if (!isGeminiError(error)) {
      throw new Error('An unexpected error occurred. Please try again.');
    }

    // Handle rate limiting (429 error)
    if (error.code === 429 || error.status === 'RESOURCE_EXHAUSTED') {
      if (retryCount < maxRetries) {
        // Extract retry delay from error details
        let retryDelay = 5000; // Default 5 seconds
        if (error.details) {
          const retryInfo = error.details.find((detail) => 
            detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
          );
          if (retryInfo?.retryDelay) {
            // Convert retry delay to milliseconds (e.g., "50s" -> 50000ms)
            const delayStr = retryInfo.retryDelay;
            if (delayStr.endsWith('s')) {
              retryDelay = parseInt(delayStr.slice(0, -1)) * 1000;
            }
          }
        }
        
        console.log(`Rate limited. Retrying in ${retryDelay/1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
        
        // Wait for the specified delay
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // Retry the request
        return getGeminiResponse(prompt, retryCount + 1);
      } else {
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
      }
    }
    
    // Handle other API errors
    if (error.code === 400) {
      throw new Error('Invalid request. Please check your input and try again.');
    } else if (error.code === 401) {
      throw new Error('Authentication failed. Please check your API key.');
    } else if (error.code === 403) {
      throw new Error('Access denied. Please check your API permissions.');
    } else if (error.code && error.code >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    // Generic error handling
    throw new Error(error.message || 'An unexpected error occurred. Please try again.');
  }
};

// Helper function to check if we're approaching rate limits
export const getRateLimitInfo = () => {
  // You could implement a simple counter here to track requests
  // For now, we'll return a basic message
  return {
    message: 'Free tier allows 10 requests per minute',
    remainingRequests: 'Unknown' // You could implement a counter to track this
  };
};