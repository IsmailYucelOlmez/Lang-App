import Navbar from "./Navbar"
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-evenly items-center p-4">
      <div>
        <h1>Logo</h1>
      </div>
      <Navbar />

      <div>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  )
}

export default Header
