import Image from "../Image"
import Background from "../../../assets/LangAppBg.png"
import { Book } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  
  const navigate = useNavigate()

  return (
    <div className="relative w-full -z-10 -mt-16">
      <Image src={Background} className="w-screen object-cover overflow-hidden " />

      <div className="absolute top-1/3 left-16 w-1/3 h-full flex flex-col gap-4 z-10">
        <h6 className="text-xl font-bold">Start Your Journey</h6>
        <h5 className="text-3xl font-bold">Learn English by Living the Story</h5>
        <p className="text-lg font-semibold">Immerse yourself in great books and pick up new English words and phrases. 
          Simply tap for instant translations, then solidify your understanding with tailored exercises directly from the passages you've just read. </p>
        <button onClick={()=>navigate('/library')} className="cursor-pointer w-1/2 bg-[#dcb100] px-4 py-2 rounded-full flex justify-center items-center gap-2">
          <Book size={16} />
          Start Now
        </button>
      </div>
    </div>
  )
}

export default HeroSection
