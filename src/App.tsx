// src/App.tsx

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import { BlogHome, BlogDetails } from "./pages/Blog";
import NotFound from "./pages/NotFound";
import BlogAdmin from "./pages/Blog/Admin/BlogAdmin"; // ⬅️ Add this at the top
import AddEditBlogPost from "./pages/Blog/Admin/AddEditBlogPost";
import BlogForm from "./pages/Blog/Admin/BlogForm"; // 🆕 import

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      {isHomePage && <Navbar />}

      <div className="flex-grow-1 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/admin/blogs/new" element={<AddEditBlogPost />} />
          <Route path="/admin/blogs/:id/edit" element={<AddEditBlogPost />} />
          <Route path="/admin/blogs" element={<BlogAdmin />} />
          <Route path="/admin/blog/new" element={<BlogForm />} />
<Route path="/admin/blog/:id" element={<BlogForm />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
