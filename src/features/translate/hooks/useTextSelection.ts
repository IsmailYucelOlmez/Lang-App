import { useState, useEffect, useCallback } from 'react';
import useTranslate from '../api/deepl';

interface SelectionData {
  text: string;
  x: number;
  y: number;
}

const useTextSelection = () => {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { data: translation, isLoading } = useTranslate(selection?.text || '');

  const handleMouseUp = useCallback(() => {
    const selectedText = window.getSelection()?.toString().trim();
    
    if (selectedText && selectedText.length > 0) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelection({
          text: selectedText,
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
      setSelection(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
    setSelection(null);
  }, []);

  return {
    selection,
    isVisible,
    translation: translation?.translations?.[0]?.text || '',
    isLoading,
    hideTooltip
  };
};

export default useTextSelection; 