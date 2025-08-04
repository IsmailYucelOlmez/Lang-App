import { fontOptions } from '../utils/fonts';
import { ALargeSmall, ChevronDown, ChevronUp, Moon, Play, Sun } from 'lucide-react';

const ReaderSidebar = ({currentPagePair,numPages,darkTheme,fontDropdownRef,isFontDropdownOpen,setIsFontDropdownOpen,selectedFont,handleFontChange,setCurrentPagePair,setDarkTheme,showAudioControls,setShowAudioControls}:{currentPagePair:number,numPages:number,darkTheme:boolean,fontDropdownRef:React.RefObject<HTMLDivElement | null>,isFontDropdownOpen:boolean,setIsFontDropdownOpen:(value:boolean)=>void,selectedFont:string,handleFontChange:(value:string)=>void,setCurrentPagePair:(value:number)=>void,setDarkTheme:(value:boolean | ((prev: boolean) => boolean))=>void,showAudioControls:boolean,setShowAudioControls:(value:boolean | ((prev: boolean) => boolean))=>void}) => {
 

    const goToPreviousPair = () => {
        setCurrentPagePair(Math.max(1, currentPagePair - 2));
    };
  
    const goToNextPair = () => {
        if (numPages) {
          setCurrentPagePair(Math.min(numPages - 1, currentPagePair + 2));
        }
    };

    const toggleTheme=()=>{

        setDarkTheme((prev: boolean)=>!prev)
      }

    const toggleAudioControls = () => {
        setShowAudioControls((prev: boolean) => !prev);
    };
 
    return (
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

            <button onClick={toggleAudioControls} className={`hover:bg-gray-100 rounded-lg transition-colors ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${showAudioControls ? (darkTheme ? 'bg-blue-400' : 'bg-blue-300') : ''}`}>
              <Play size={24} className={darkTheme ? 'text-gray-200' : 'text-gray-800'} />
            </button>

            <button onClick={toggleTheme} className={`hover:bg-gray-100 rounded-lg transition-colors ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              {darkTheme ? <Sun size={24} className="text-gray-200"/> : <Moon size={24} className="text-gray-800"/>}
            </button>

    </div>
  )
}

export default ReaderSidebar
