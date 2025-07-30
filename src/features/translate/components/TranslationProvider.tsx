import React from 'react';
import useTextSelection from '../hooks/useTextSelection';
import TranslationTooltip from './TranslationTooltip';

interface TranslationProviderProps {
  children: React.ReactNode;
}

const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const {
    selection,
    isVisible,
    translation,
    isLoading,
    hideTooltip
  } = useTextSelection();

  return (
    <>
      {children}
      <TranslationTooltip
        isVisible={isVisible}
        x={selection?.x || 0}
        y={selection?.y || 0}
        originalText={selection?.text || ''}
        translation={translation}
        isLoading={isLoading}
        onClose={hideTooltip}
      />
    </>
  );
};

export default TranslationProvider; 