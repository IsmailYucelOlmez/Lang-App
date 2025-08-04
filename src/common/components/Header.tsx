import { LogInIcon } from "lucide-react"
import Navbar from "./Navbar"
import { useNavigate } from 'react-router-dom';


const Header = ({isDark=false}:{isDark?:boolean}) => {
  
  const navigate = useNavigate();

  return (
    <div className={`flex justify-around items-center z-50 w-full h-16 ${isDark ? 'bg-black text-white':''}`}>
      <div>
        <h1>Logo</h1>
      </div>
      <Navbar />

      <div>
        <button onClick={() => navigate('/login')} className={`${isDark ? 'bg-black text-white border border-white':'bg-white text-black'}  px-3 py-1.5 rounded-full flex items-center gap-2`}>
          <LogInIcon size={16} />
          Login
        </button>
      </div>
    </div>
  )
}

export default Header
