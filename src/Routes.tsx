import { Route, Routes } from "react-router-dom"
import HomePage from "./common/pages/HomePage"
import UserProfilePage from "./features/user/pages/UserProfilePage"
import AdminPanelPage from "./features/admin/pages/AdminPanelPage"


const RouteSection = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Routes>
  )
}

export default RouteSection
