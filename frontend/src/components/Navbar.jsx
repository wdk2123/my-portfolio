import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinkClass = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-blue-600"
        : "text-slate-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">
          Dev<span className="text-blue-600">Portfolio</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/projects" className={navLinkClass("/projects")}>
            Projects
          </Link>
          <Link to="/skills" className={navLinkClass("/skills")}>
            Skills
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition font-medium"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;