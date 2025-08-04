import { useState, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { rateLimitTracker } from '../services/rateLimitTracker';
import { continuePrompt, listeningPrompt, translatePrompt } from '../utils/promptTexts';


function GeminiComponent({type, passage, placeholder}:{type:string, passage:string, placeholder:string}) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitStatus, setRateLimitStatus] = useState('');

  // Update rate limit status every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRateLimitStatus(rateLimitTracker.getStatusMessage());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    let question = "";
    if (!type) return;

    if (type=="listening") {
      question = listeningPrompt(passage, prompt)
    }

    if (type=="translate") {
      question = translatePrompt(passage, prompt)
    }

    if (type=="continue") {
      question = continuePrompt(passage, prompt)
    }

    setIsLoading(true);
    setResponse('');  

    try {
      const response = await getGeminiResponse(question);
      setResponse(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      setResponse(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 border border-gray-300 rounded-md p-4'>
      <div className='text-xs text-gray-600'>
        {rateLimitStatus}
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        className='border border-gray-300 rounded-md p-2 focus:outline-none'
      />
      <button 
        onClick={handleSubmit} 
        disabled={isLoading || !rateLimitTracker.canMakeRequest()} 
        className='bg-[#00a884] border border-white text-white rounded-lg px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default GeminiComponent;