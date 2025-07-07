import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggle = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        <Link to="/admin/blog" className="btn btn-outline-secondary mb-3 ms-2">
  + Create New Post
</Link>

        <Link className="navbar-brand" to="/">MyApp</Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div
          className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`} to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Theme toggle button on the right */}
          <motion.button
            onClick={toggleTheme}
            className="btn btn-outline-secondary ms-lg-3 mt-2 mt-lg-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
