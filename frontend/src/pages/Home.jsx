import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [profile, setProfile] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("profile/")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Profile error:", error));

    api.get("skills/")
      .then((response) => setSkills(response.data.slice(0, 6)))
      .catch((error) => console.error("Skills error:", error));

    api.get("projects/")
      .then((response) => {
        const featuredProjects = response.data.filter((project) => project.featured).slice(0, 3);
        setProjects(featuredProjects);
      })
      .catch((error) => console.error("Projects error:", error));
  }, []);

  const user = profile[0];

  return (
    <MainLayout>
      {user && (
        <section className="py-20 md:py-24 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              {user.profile_image_url ? (
                <img
                  src={user.profile_image_url}
                  alt={user.full_name}
                  className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-white shadow-xl"
                />
              ) : (
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-md">
                  No Image
                </div>
              )}
            </div>

            {/* Name and Title */}
            <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-3">
              Full-Stack Developer
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
              {user.full_name}
            </h1>

            <h2 className="text-xl md:text-2xl text-slate-600 font-medium mb-6">
              {user.title}
            </h2>

            <p className="text-lg text-slate-600 leading-8 max-w-3xl mx-auto mb-10">
              {user.bio}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                to="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                View My Work
              </Link>

              <Link
                to="/contact"
                className="border border-slate-300 hover:border-slate-400 text-slate-900 px-6 py-3 rounded-xl font-medium transition"
              >
                Contact Me
              </Link>

              {user.resume_url && (
                <a
                  href={user.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Download Resume
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center flex-wrap gap-5 text-sm text-slate-600">
              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  GitHub
                </a>
              )}

              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  LinkedIn
                </a>
              )}

              {user.twitter && (
                <a
                  href={user.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Skills Preview */}
      <section className="py-16 border-t border-slate-200">
        <div className="mb-10 text-center">
          <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Technologies I work with
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A selection of the tools and technologies I use to build modern web applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-900">{skill.name}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
                  {skill.category}
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>

              <p className="text-sm text-slate-500 mt-3">
                {skill.proficiency}% proficiency
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/skills"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all skills →
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-t border-slate-200">
        <div className="mb-10 text-center">
          <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Featured work
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Some of the projects I’ve built using React, Django, APIs, and modern development tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    Featured
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 leading-7 mb-4">
                  {project.short_description}
                </p>

                <p className="text-sm text-slate-500 mb-5">
                  <span className="font-medium text-slate-700">Tech:</span> {project.tech_stack}
                </p>

                <Link
                  to={`/projects/${project.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View project →
                </Link>
              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-full text-center">No featured projects yet.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 border-t border-slate-200">
        <div className="bg-slate-900 rounded-3xl px-8 py-14 md:px-14 md:py-16 text-center text-white">
          <p className="text-blue-300 font-medium uppercase tracking-wider text-sm mb-3">
            Let’s work together
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Interested in working with me?
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-8 mb-8">
            I’m available for internships, freelance projects, and junior developer opportunities.
            If you like my work, let’s talk.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default Home;