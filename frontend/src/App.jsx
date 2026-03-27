import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardMessages from "./pages/DashboardMessages";
import DashboardSkills from "./pages/DashboardSkills";
import DashboardProfile from "./pages/DashboardProfile";
import EditProject from "./pages/EditProject";
import EditSkill from "./pages/EditSkill";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/projects"
          element={
            <ProtectedRoute>
              <DashboardProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/projects/edit/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/skills"
          element={
            <ProtectedRoute>
              <DashboardSkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/skills/edit/:id"
          element={
            <ProtectedRoute>
              <EditSkill />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/messages"
          element={
            <ProtectedRoute>
              <DashboardMessages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;