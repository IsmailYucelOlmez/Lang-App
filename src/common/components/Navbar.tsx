import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/library">Library</NavLink>
      <NavLink to="/exercise">Exercise</NavLink>
      <NavLink to="/dictionary">Dictionary</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Navbar
