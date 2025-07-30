import { Route, Routes } from "react-router-dom"
import HomePage from "./common/pages/HomePage"
import UserProfilePage from "./features/user/pages/UserProfilePage"
import AdminPanelPage from "./features/admin/pages/AdminPanelPage"
import TranslationDemoPage from "./features/translate/pages/TranslationDemoPage"


const RouteSection = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/translate-demo" element={<TranslationDemoPage />} />
      </Routes>
  )
}

export default RouteSection
