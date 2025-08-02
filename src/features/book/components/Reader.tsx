
import { useState, useRef, useEffect } from 'react'
import { Document, Page } from 'react-pdf';

import TranslationTooltip from '../../translate/components/TranslationTooltip';
import useTextSelection from '../../translate/hooks/useTextSelection';
import ReaderSidebar from './ReaderSidebar';
import { fontOptions } from '../utils/fonts';


const Reader = ({file}:{file:string}) => {
    const [numPages, setNumPages] = useState<number>();
    const [currentPagePair, setCurrentPagePair] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFont, setSelectedFont] = useState<string>('default');
    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState<boolean>(false);
    const fontDropdownRef = useRef<HTMLDivElement>(null);
    const [darkTheme,setDarkTheme]=useState<boolean>(false);
    
    // Translation functionality
    const { selection, isVisible, translation, isLoading, hideTooltip } = useTextSelection();
  
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
      setNumPages(numPages);
      setLoading(false);
      setError(null);
    }

    function onDocumentLoadError(error: Error): void {
      console.error('PDF loading error:', error);
      console.error('File path:', file);
      setError(`PDF dosyası yüklenirken hata oluştu. Hata: ${error.message}. Dosya yolu: ${file}`);
      setLoading(false);
    }

    // Calculate which pages to show (two pages at once)
    const getPageNumbers = () => {
      if (!numPages) return [];
      
      const firstPage = currentPagePair;
      const secondPage = currentPagePair + 1;
      
      // If second page doesn't exist, only show first page
      if (secondPage > numPages) {
        return [firstPage];
      }
      
      return [firstPage, secondPage];
    };

    const handleFontChange = (fontValue: string) => {
      setSelectedFont(fontValue);
      setIsFontDropdownOpen(false);
    };

    // Get the font family for the selected font
    const getSelectedFontFamily = () => {
      const fontOption = fontOptions.find(option => option.value === selectedFont);
      return fontOption ? fontOption.fontFamily : 'inherit';
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
          setIsFontDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const pageNumbers = getPageNumbers();

    
  
    return (
      <div className={`flex justify-center items-start min-h-screen p-4 ${darkTheme ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
        {loading && <div className={`text-lg ${darkTheme ? 'text-gray-200' : 'text-gray-800'}`}>PDF yükleniyor...</div>}
        {error && (
          <div className={`text-red-500 text-center p-4 rounded-lg border max-w-md ${darkTheme ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
            <p className="font-bold">Hata:</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Translation Tooltip */}
        <TranslationTooltip
          isVisible={isVisible}
          x={selection?.x || 0}
          y={selection?.y || 0}
          originalText={selection?.text || ''}
          translation={translation}
          isLoading={isLoading}
          onClose={hideTooltip}
        />

        <div className={`w-9/10 mx-auto rounded-lg shadow-lg p-6 ${darkTheme ? 'bg-black' : 'bg-white'} max-h-[90vh] overflow-y-auto`}>
          <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className={`text-center py-8 ${darkTheme ? 'text-gray-200' : 'text-gray-800'}`}>PDF yükleniyor...</div>}
            error={<div className="text-center py-8 text-red-500">PDF yüklenirken hata oluştu</div>}
            className={darkTheme ? 'dark-pdf' : ''}
          >
            <div className="flex justify-between">
              {pageNumbers.map((pageNumber) => (
                <div
                  key={pageNumber}
                  className={`flex-shrink-0 ${darkTheme ? 'dark-pdf-container' : ''}`}
                  style={{
                    backgroundColor: darkTheme ? '#1f2937' : 'transparent',
                    borderRadius: '8px',
                    padding: darkTheme ? '8px' : '0',
                    boxShadow: darkTheme ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none',
                    border: '2px solid',
                    borderColor: darkTheme ? '#000' : '#e5e7eb',
                    position: 'relative',
                    zIndex: 200,
                    maxWidth: '50%',
                    maxHeight: '80vh',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                     className="pdf-container"
                     style={{ 
                     borderRadius: '6px', 
                     overflow: 'hidden',
                     maxHeight: '100%',
                     overflowY: 'auto',
                     backgroundColor: darkTheme ? '#000000' : 'white',
                     filter: 'none',
                     fontFamily: getSelectedFontFamily(),
                     
                   }}>
                                         <Page
                       pageNumber={pageNumber}
                       className={`w-full h-auto ${darkTheme ? 'dark-pdf-page' : ''}`}
                       renderTextLayer={true}
                       renderAnnotationLayer={false}
                       canvasBackground={darkTheme ? '#000000' : '#ffffff'}
                     />
                  </div>
                </div>
              ))}
            </div>
          </Document>
        </div>
        {numPages && (
          <ReaderSidebar
            currentPagePair={currentPagePair}
            numPages={numPages}
            darkTheme={darkTheme}          
            fontDropdownRef={fontDropdownRef}
            isFontDropdownOpen={isFontDropdownOpen}
            setIsFontDropdownOpen={setIsFontDropdownOpen}
            selectedFont={selectedFont}
            handleFontChange={handleFontChange}
            setCurrentPagePair={setCurrentPagePair}
            setDarkTheme={setDarkTheme}
          />
        )}
      </div>
    );
}

export default Reader
