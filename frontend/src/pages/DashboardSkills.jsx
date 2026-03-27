import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import api from "../services/api";

function DashboardSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    proficiency: "",
  });

  const fetchSkills = async () => {
    try {
      const response = await api.get("skills/");
      setSkills(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("skills/create/", {
        ...formData,
        proficiency: Number(formData.proficiency),
      });

      setMessage("Skill created successfully.");
      setFormData({
        name: "",
        category: "frontend",
        proficiency: "",
      });
      fetchSkills();
    } catch (error) {
      console.error(error);
      setMessage("Failed to create skill.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`skills/delete/${id}/`);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete skill.");
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
              Manage Skills
            </h1>
            <p className="text-lg text-slate-600">
              Add and maintain your technical skills.
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
                Add New Skill
              </h2>

              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Skill name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="number"
                  name="proficiency"
                  placeholder="Proficiency %"
                  value={formData.proficiency}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Add Skill
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Existing Skills
              </h2>

              {loading ? (
                <p className="text-slate-500">Loading skills...</p>
              ) : (
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">
                            {skill.name}
                          </h3>
                          <p className="text-slate-500 capitalize mt-1">
                            {skill.category}
                          </p>
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {skill.proficiency}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          to={`/dashboard/skills/edit/${skill.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {skills.length === 0 && (
                    <p className="text-slate-500">No skills found.</p>
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

export default DashboardSkills;