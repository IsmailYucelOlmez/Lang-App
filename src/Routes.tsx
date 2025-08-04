import { Route, Routes } from "react-router-dom"
import HomePage from "./common/pages/HomePage"
import LoginPage from "./common/pages/LoginPage"
import UserProfilePage from "./features/user/pages/UserProfilePage"
import AdminPanelPage from "./features/admin/pages/AdminPanelPage"
import TranslationDemoPage from "./features/translate/pages/TranslationDemoPage"
import ReadingPage from "./features/book/pages/ReadingPage"
import ExercisePage from "./features/exercise/pages/ExercisePage"


const RouteSection = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/admin" element={<AdminPanelPage />} />
      <Route path="/translate-demo" element={<TranslationDemoPage />} />
      <Route path="/read/:id" element={<ReadingPage />} />
      <Route path="/exercise" element={<ExercisePage />} />
    </Routes>

  )
}

export default RouteSection
