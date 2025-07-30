import React from 'react';

interface TranslationTooltipProps {
  isVisible: boolean;
  x: number;
  y: number;
  originalText: string;
  translation: string;
  isLoading: boolean;
  onClose: () => void;
}

const TranslationTooltip: React.FC<TranslationTooltipProps> = ({
  isVisible,
  x,
  y,
  originalText,
  translation,
  isLoading,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="translation-tooltip fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg min-w-[300px] max-w-[400px] font-sans"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <span className="font-semibold text-gray-700 text-sm">Çeviri</span>
        <button 
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-lg transition-colors"
          onClick={onClose}
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <strong className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Seçilen Metin:</strong>
          <p className="text-gray-600 italic text-sm leading-relaxed">{originalText}</p>
        </div>
        
        <div>
          <strong className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Türkçe Çeviri:</strong>
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <span>Çeviriliyor...</span>
            </div>
          ) : (
            <p className="text-gray-800 text-sm leading-relaxed">{translation || 'Çeviri bulunamadı'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationTooltip; 