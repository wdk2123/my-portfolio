import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [projectImage, setProjectImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("projects/")
      .then((response) => {
        const project = response.data.find((item) => item.id === parseInt(id));
        if (project) {
          setFormData({
            title: project.title || "",
            slug: project.slug || "",
            short_description: project.short_description || "",
            description: project.description || "",
            tech_stack: project.tech_stack || "",
            github_link: project.github_link || "",
            live_demo_link: project.live_demo_link || "",
            featured: project.featured || false,
          });
          setCurrentImage(project.image_url || "");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

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

  const handleSubmit = async (e) => {
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
      const response = await api.put(`projects/update/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCurrentImage(response.data.image_url || "");
      setMessage("Project updated successfully.");

      setTimeout(() => {
        navigate("/dashboard/projects");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update project.");
    }
  };

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
                Dashboard
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                Edit Project
              </h1>
              <p className="text-lg text-slate-600">
                Update your project information.
              </p>
            </div>

            <Link
              to="/dashboard/projects"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Projects
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading project...</p>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
              {message && (
                <div className="mb-6 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {currentImage && (
                  <img
                    src={currentImage}
                    alt="Project"
                    className="w-full h-64 object-cover rounded-2xl border border-slate-200"
                  />
                )}

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
                  rows="6"
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
                  Update Project
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default EditProject;