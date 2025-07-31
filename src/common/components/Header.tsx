import { LogInIcon } from "lucide-react"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <div className="flex justify-around items-center z-50 w-full h-16">
      <div>
        <h1>Logo</h1>
      </div>
      <Navbar />

      <div>
        <button className="bg-white text-black px-3 py-1.5 rounded-full flex items-center gap-2">
          <LogInIcon size={16} />
          Login
        </button>
      </div>
    </div>
  )
}

export default Header
