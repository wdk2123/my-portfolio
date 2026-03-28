import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("projects/")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
            Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            My Work
          </h1>
          <p className="text-lg text-slate-600 leading-8">
            A selection of projects I’ve built using React, Django, REST APIs,
            and modern web development tools.
          </p>
        </div>

        {loading && (
          <div className="text-center text-slate-500">
            Loading projects...
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {projects.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
                  >
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-52 object-cover"
                      />
                    )}

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {project.featured ? (
                          <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-block text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                            Project
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                        {project.title}
                      </h2>

                      <p className="text-slate-600 leading-7 mb-4">
                        {project.short_description}
                      </p>

                      <p className="text-sm text-slate-500 mb-6">
                        <span className="font-medium text-slate-700">Tech:</span>{" "}
                        {project.tech_stack}
                      </p>

                      <div className="flex items-center justify-between">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details →
                        </Link>

                        <div className="flex gap-3">
                          {project.github_link && (
                            <a
                              href={project.github_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-slate-600 hover:text-blue-600 transition"
                            >
                              GitHub
                            </a>
                          )}

                          {project.live_demo_link && (
                            <a
                              href={project.live_demo_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-slate-600 hover:text-blue-600 transition"
                            >
                              Live
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500">
                No projects available yet.
              </div>
            )}
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default Projects;