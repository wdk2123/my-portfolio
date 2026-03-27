import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    proficiency: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("skills/")
      .then((response) => {
        const skill = response.data.find((item) => item.id === parseInt(id));
        if (skill) {
          setFormData({
            name: skill.name || "",
            category: skill.category || "frontend",
            proficiency: skill.proficiency || "",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.put(`skills/update/${id}/`, {
        ...formData,
        proficiency: Number(formData.proficiency),
      });

      setMessage("Skill updated successfully.");

      setTimeout(() => {
        navigate("/dashboard/skills");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update skill.");
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
                Edit Skill
              </h1>
              <p className="text-lg text-slate-600">
                Update your skill information.
              </p>
            </div>

            <Link
              to="/dashboard/skills"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Skills
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading skill...</p>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
              {message && (
                <div className="mb-6 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  Update Skill
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default EditSkill;