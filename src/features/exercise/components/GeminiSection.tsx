import { useState } from 'react';
import { getGeminiResponse } from '../services/gemini';


function GeminiComponent({text}:{text:string}) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text) return;

    setIsLoading(true);

    const response = await getGeminiResponse(text);

    if(!response){
        setResponse('An error occurred. Please try again.');
    }

    setResponse(response);
    setIsLoading(false);
    
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button onClick={handleSubmit} disabled={isLoading}>
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