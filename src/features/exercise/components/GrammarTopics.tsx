import { getGeminiResponse } from "../services/gemini"
import { useQuery } from "@tanstack/react-query";

const GrammarTopics = ({passage}:{passage:string}) => { 

  const question = `Analyze the following text and list ONLY the grammar topic titles found in the sentences. Do not include examples from the text or any introductory phrases. Format as a simple list of grammar topics:

${passage}

Respond with only the grammar topic names, one per line, without any additional text or formatting.`

  const {data:response, isLoading, error} = useQuery({
    queryKey: ['gemini-response'],
    queryFn: () => getGeminiResponse(question),
  });

  // Format the response to show only titles
  const formatGrammarTopics = (response: string) => {
    if (!response) return '';
    
    // Split by lines and filter out empty lines
    const lines = response.split('\n').filter(line => line.trim());
    
    // Extract only the grammar topic titles (remove examples in parentheses, asterisks, etc.)
    const topics = lines.map(line => {
      // Remove asterisks and common formatting
      let topic = line.replace(/\*\*/g, '').trim();
      
      // Remove content in parentheses (examples)
      topic = topic.replace(/\([^)]*\)/g, '').trim();
      
      // Remove colons and extra punctuation
      topic = topic.replace(/[:：]/g, '').trim();
      
      return topic;
    }).filter(topic => topic.length > 0);
    
    return topics.join('\n');
  };

  return (  
    <div className='w-full flex flex-col gap-6 border border-gray-300 rounded-md p-4'>
      <h6 className='text-lg font-semibold text-center'>Grammar Topics</h6>

      {error && (
        <div className='text-red-600 text-sm'>
          Error: {error.message}
        </div>
      )}

      {isLoading && (
        <div className='text-sm'>
          Loading...
        </div>
      )}

      {response && !isLoading && (
        <div className='text-sm whitespace-pre-line'>
          {formatGrammarTopics(response)}
        </div>
      )}

    </div>
  )
}

export default GrammarTopics
