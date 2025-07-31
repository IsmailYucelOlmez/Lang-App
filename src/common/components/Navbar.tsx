import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center gap-4">
      <NavLink to="/" className={({isActive})=>isActive ? "text-lg font-semibold underline underline-offset-2" : "text-lg" }>Home</NavLink>
      <NavLink to="/library" className={({isActive})=>isActive ? "text-lg font-semibold underline underline-offset-2" : "text-lg" }>Library</NavLink>
      <NavLink to="/exercise" className={({isActive})=>isActive ? "text-lg font-semibold underline underline-offset-2" : "text-lg" }>Exercise</NavLink>
      <NavLink to="/dictionary" className={({isActive})=>isActive ? "text-lg font-semibold underline underline-offset-2" : "text-lg" }>Dictionary</NavLink>
      <NavLink to="/about" className={({isActive})=>isActive ? "text-lg font-semibold underline underline-offset-2" : "text-lg" }>About</NavLink>
    </nav>
  )
}

export default Navbar
