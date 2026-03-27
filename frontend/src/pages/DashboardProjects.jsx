import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import api from "../services/api";

function DashboardProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    tech_stack: "",
    github_link: "",
    live_demo_link: "",
    featured: false,
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get("projects/");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("projects/create/", formData);

      setMessage("Project created successfully.");
      setFormData({
        title: "",
        slug: "",
        short_description: "",
        description: "",
        tech_stack: "",
        github_link: "",
        live_demo_link: "",
        featured: false,
      });
      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage("Failed to create project.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`projects/delete/${id}/`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete project.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Manage Projects</h1>
          <p className="text-slate-600">
            Add new projects and manage your portfolio content.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Create Project</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="slug"
                placeholder="Slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="short_description"
                placeholder="Short Description"
                value={formData.short_description}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="tech_stack"
                placeholder="Tech Stack"
                value={formData.tech_stack}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="url"
                name="github_link"
                placeholder="GitHub Link"
                value={formData.github_link}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="url"
                name="live_demo_link"
                placeholder="Live Demo Link"
                value={formData.live_demo_link}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Featured Project
              </label>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Create Project
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Existing Projects</h2>

            {loading ? (
              <p className="text-slate-500">Loading projects...</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-slate-600 mb-2">{project.short_description}</p>
                        <p className="text-sm text-slate-500 mb-1">
                          <span className="font-medium text-slate-700">Slug:</span> {project.slug}
                        </p>
                        <p className="text-sm text-slate-500">
                          <span className="font-medium text-slate-700">Tech:</span> {project.tech_stack}
                        </p>
                      </div>

                      {project.featured && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Link
                        to={`/dashboard/projects/edit/${project.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <p className="text-slate-500">No projects found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardProjects;