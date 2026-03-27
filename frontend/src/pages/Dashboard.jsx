import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("auth/me/")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
              Dashboard
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Admin Panel
            </h1>
            <p className="text-lg text-slate-600">
              Manage your portfolio content from one place.
            </p>
          </div>

          {userData ? (
            <>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
                <p className="text-slate-500 mb-2">{userData.message}</p>
                <p className="text-xl text-slate-900">
                  Welcome back, <span className="font-semibold">{userData.user}</span>
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Link
                  to="/dashboard/profile"
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Profile
                  </h2>
                  <p className="text-slate-600 text-sm leading-6">
                    Update your personal info, image, and resume.
                  </p>
                </Link>

                <Link
                  to="/dashboard/projects"
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Projects
                  </h2>
                  <p className="text-slate-600 text-sm leading-6">
                    Create, edit, and delete portfolio projects.
                  </p>
                </Link>

                <Link
                  to="/dashboard/skills"
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Skills
                  </h2>
                  <p className="text-slate-600 text-sm leading-6">
                    Manage your technical skills and proficiency levels.
                  </p>
                </Link>

                <Link
                  to="/dashboard/messages"
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Messages
                  </h2>
                  <p className="text-slate-600 text-sm leading-6">
                    View contact form submissions from visitors.
                  </p>
                </Link>
              </div>

              <div className="mt-10">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p className="text-slate-500">Loading dashboard...</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default Dashboard;