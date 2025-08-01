import { ALargeSmall, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import { useState, useRef, useEffect } from 'react'
import { Document, Page } from 'react-pdf';
import { fontOptions } from '../utils/fonts';
import TranslationTooltip from '../../translate/components/TranslationTooltip';
import useTextSelection from '../../translate/hooks/useTextSelection';


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

    const goToPreviousPair = () => {
      setCurrentPagePair(Math.max(1, currentPagePair - 2));
    };

    const goToNextPair = () => {
      if (numPages) {
        setCurrentPagePair(Math.min(numPages - 1, currentPagePair + 2));
      }
    };

    const handleFontChange = (fontValue: string) => {
      setSelectedFont(fontValue);
      setIsFontDropdownOpen(false);
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

    const toggleTheme=()=>{

      setDarkTheme((prev)=>!prev)
    }
  
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
                                     <div style={{ 
                     borderRadius: '6px', 
                     overflow: 'hidden',
                     maxHeight: '100%',
                     overflowY: 'auto',
                     backgroundColor: darkTheme ? '#000000' : 'white',
                     filter: 'none',
                     
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
          <div className="w-18 flex flex-col items-center gap-4">
            <div className='flex flex-col items-center gap-2'>
              <button  onClick={goToPreviousPair} disabled={currentPagePair <= 1} className={`rounded-lg transition-colors ${darkTheme ? 'disabled:bg-gray-700 disabled:text-gray-500 hover:bg-gray-700' : 'disabled:bg-gray-300 disabled:text-slate-500 hover:bg-gray-100'} disabled:cursor-not-allowed`} >
                <ChevronUp size={24} className={darkTheme ? 'text-gray-200' : 'text-gray-800'} />
              </button>

              <p className={`text-base font-medium ${darkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                {currentPagePair} - {Math.min(currentPagePair + 1, numPages)}
              </p>
              
              <button  onClick={goToNextPair} disabled={currentPagePair >= numPages - 1} className={`rounded-lg transition-colors ${darkTheme ? 'disabled:bg-gray-700 disabled:text-gray-500 hover:bg-gray-700' : 'disabled:bg-gray-300 disabled:text-slate-500 hover:bg-gray-100'} disabled:cursor-not-allowed`} >
                  <ChevronDown size={24} className={darkTheme ? 'text-gray-200' : 'text-gray-800'} />
              </button>
            </div> 

            {/* Font Selection Controls */}
            <div className="flex flex-col">
              <div className="relative" ref={fontDropdownRef}>
                <button
                  onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                  className={`p-2 rounded-lg transition-colors ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  title="Font seçenekleri"
                >
                  <ALargeSmall size={24} className={darkTheme ? 'text-gray-200' : 'text-gray-800'} />
                </button>
                
                {isFontDropdownOpen && (
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 border rounded-md shadow-lg z-10 min-w-[150px] ${darkTheme ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
                    {fontOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFontChange(option.value)}
                        className={`block w-full text-left px-2 py-2 text-xs first:rounded-t-md last:rounded-b-md transition-colors ${
                          selectedFont === option.value 
                            ? darkTheme 
                              ? 'bg-blue-900/50 text-blue-300' 
                              : 'bg-blue-50 text-blue-600'
                            : darkTheme
                              ? 'hover:bg-gray-700 text-gray-200'
                              : 'hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button onClick={toggleTheme} className={`hover:bg-gray-100 rounded-lg transition-colors ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              {darkTheme ? <Sun size={24} className="text-gray-200"/> : <Moon size={24} className="text-gray-800"/>}
            </button>

          </div>
        )}
      </div>
    );
}

export default Reader
