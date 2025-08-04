import { useState, useEffect, useRef } from 'react';

interface UsePageTextProps {
  pageNumber: number;
  onTextExtracted?: (text: string) => void;
}

const usePageText = ({ pageNumber, onTextExtracted }: UsePageTextProps) => {
  const [pageText, setPageText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const extractTextFromPage = () => {
    if (!pageRef.current) return;

    setIsExtracting(true);
    
    try {
      // Get all text elements from the PDF page
      const textElements = pageRef.current.querySelectorAll('.react-pdf__Page__textContent span');
      const textArray: string[] = [];

      textElements.forEach((element) => {
        const text = element.textContent?.trim();
        if (text) {
          textArray.push(text);
        }
      });

      const extractedText = textArray.join(' ').replace(/\s+/g, ' ').trim();
      
      // Only set text if we actually extracted something meaningful
      if (extractedText.length > 10) {
        setPageText(extractedText);
        
        if (onTextExtracted) {
          onTextExtracted(extractedText);
        }
      } else {
        console.warn(`Page ${pageNumber}: Insufficient text extracted (${extractedText.length} characters)`);
        setPageText('');
      }
    } catch (error) {
      console.error('Error extracting text from page:', error);
      setPageText('');
    } finally {
      setIsExtracting(false);
    }
  };

  useEffect(() => {
    // Extract text when page number changes
    if (pageNumber > 0) {
      // Small delay to ensure the page is rendered
      const timer = setTimeout(() => {
        extractTextFromPage();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pageNumber]);

  return {
    pageText,
    isExtracting,
    pageRef,
    extractTextFromPage
  };
};

export default usePageText; 