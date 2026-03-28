import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import api from "../services/api";

function DashboardProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [projectImage, setProjectImage] = useState(null);

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
      setMessage("Failed to load projects.");
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProjectImage(e.target.files[0]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("short_description", formData.short_description);
    data.append("description", formData.description);
    data.append("tech_stack", formData.tech_stack);
    data.append("github_link", formData.github_link);
    data.append("live_demo_link", formData.live_demo_link);
    data.append("featured", formData.featured);

    if (projectImage) {
      data.append("image", projectImage);
    }

    try {
      await api.post("projects/create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      setProjectImage(null);
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
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
              Dashboard
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Manage Projects
            </h1>
            <p className="text-lg text-slate-600">
              Add new projects and manage your portfolio work.
            </p>
          </div>

          {message && (
            <div className="mb-6 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3">
              {message}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Add New Project
              </h2>

              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="slug"
                  placeholder="Slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="short_description"
                  placeholder="Short Description"
                  value={formData.short_description}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="tech_stack"
                  placeholder="Tech Stack"
                  value={formData.tech_stack}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <input
                  type="url"
                  name="github_link"
                  placeholder="GitHub Link"
                  value={formData.github_link}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <input
                  type="url"
                  name="live_demo_link"
                  placeholder="Live Demo Link"
                  value={formData.live_demo_link}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  />
                </div>

                <label className="flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  Featured Project
                </label>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Create Project
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Existing Projects
              </h2>

              {loading ? (
                <p className="text-slate-500">Loading projects...</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"
                    >
                      {project.image_url && (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                      )}

                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">
                            {project.title}
                          </h3>
                          <p className="text-slate-600 mt-1">
                            {project.short_description}
                          </p>
                          <p className="text-sm text-slate-500 mt-2">
                            <span className="font-medium text-slate-700">Tech:</span>{" "}
                            {project.tech_stack}
                          </p>
                        </div>

                        {project.featured && (
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          to={`/dashboard/projects/edit/${project.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
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
      </section>
    </MainLayout>
  );
}

export default DashboardProjects;