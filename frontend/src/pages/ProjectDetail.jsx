import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`projects/${slug}/`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [slug]);

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        {loading ? (
          <div className="text-center text-slate-500">
            Loading project...
          </div>
        ) : project ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                to="/projects"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Projects
              </Link>
            </div>

            <div className="mb-10">
              <div className="mb-4">
                {project.featured ? (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    Featured Project
                  </span>
                ) : (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                    Project
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {project.title}
              </h1>

              <p className="text-xl text-slate-600 leading-8">
                {project.short_description}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-[260px] md:h-[420px] object-cover"
                />
              )}

              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    Overview
                  </h2>
                  <p className="text-slate-600 leading-8 whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tech_stack.split(",").map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    Project Links
                  </h2>

                  <div className="flex flex-wrap gap-4">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition"
                      >
                        View GitHub
                      </a>
                    )}

                    {project.live_demo_link && (
                      <a
                        href={project.live_demo_link}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500">
            Project not found.
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default ProjectDetail;