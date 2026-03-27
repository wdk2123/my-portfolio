import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("skills/")
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
            Skills
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Technologies I Use
          </h1>
          <p className="text-lg text-slate-600 leading-8">
            A collection of the technologies, tools, and frameworks I use to
            build full-stack web applications.
          </p>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center text-slate-500">
            Loading skills...
          </div>
        ) : (
          <>
            {skills.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {skill.name}
                      </h2>

                      <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 capitalize font-medium">
                        {skill.category}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>

                    <p className="text-sm text-slate-500 mt-4">
                      {skill.proficiency}% proficiency
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500">
                No skills added yet.
              </div>
            )}
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default Skills;