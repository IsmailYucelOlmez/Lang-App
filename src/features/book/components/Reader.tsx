import { useState } from 'react'
import { Document, Page } from 'react-pdf';

const Reader = ({file}:{file:string}) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
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
  
    return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
        {loading && <div className="text-lg">PDF yükleniyor...</div>}
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg border border-red-200 max-w-md">
            <p className="font-bold">Hata:</p>
            <p>{error}</p>
          </div>
        )}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
          <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="text-center py-8">PDF yükleniyor...</div>}
            error={<div className="text-center py-8 text-red-500">PDF yüklenirken hata oluştu</div>}
          >
            <Page 
              pageNumber={pageNumber} 
              className="max-w-full h-auto"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
        {numPages && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-lg font-medium">
              Sayfa {pageNumber} / {numPages}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Önceki
              </button>
              <button 
                onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                disabled={pageNumber >= numPages}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Sonraki
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default Reader
