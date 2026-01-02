import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudentsPage from "./pages/students"
import CoursesPage from "./pages/courses"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
