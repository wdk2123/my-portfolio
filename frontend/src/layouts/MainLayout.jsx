import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;