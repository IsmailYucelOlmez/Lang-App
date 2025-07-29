import Navbar from "./Navbar"

const Header = () => {
  return (
    <div className="flex justify-evenly items-center p-4">
      <div>
        <h1>Logo</h1>
      </div>
      <Navbar />

      <div>
        <h1>Login</h1>
      </div>
    </div>
  )
}

export default Header
