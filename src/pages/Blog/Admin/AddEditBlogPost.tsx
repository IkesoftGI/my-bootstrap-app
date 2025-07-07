// src/pages/Blog/Admin/AddEditBlogPost.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import { BlogPost } from "../../../data/blogs";
import PageWrapper from "@components/Layout/PageWrapper";

const LOCAL_STORAGE_KEY = "blogPosts";

export default function AddEditBlogPost() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState<BlogPost>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    readingTime: "3 min",
    author: "Admin",
    authorBio: "",
    categories: [],
    comments: [],
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    setPosts(parsed);

    if (id) {
      const existing = parsed.find((p: BlogPost) => p.id === id);
      if (existing) {
        setFormData(existing);
      } else {
        alert("Post not found.");
        navigate("/admin/blogs");
      }
    }
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ F2 - Required field validation
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert("Please fill in all required fields: Title, Excerpt, and Content.");
      return;
    }

    const updatedPost: BlogPost = {
      ...formData,
      id: isEditing ? formData.id : uuidv4(),
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    const updatedPosts = isEditing
      ? posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      : [...posts, updatedPost];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));

    alert(isEditing ? "Post updated!" : "New post created!");
    navigate("/admin/blogs");
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? "✏️ Edit Blog Post" : "➕ Add New Blog Post"}
      </h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Excerpt</label>
          <input
            type="text"
            name="excerpt"
            className="form-control"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content (Markdown supported)</label>
          <textarea
            name="content"
            className="form-control"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <strong>📄 Markdown Preview:</strong>
          <div className="border p-3 bg-light mt-2 rounded">
            <ReactMarkdown>{formData.content}</ReactMarkdown>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL (optional)</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categories (comma-separated)</label>
          <input
            type="text"
            name="categories"
            className="form-control"
            value={formData.categories?.join(", ") || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                categories: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="e.g. tech, education, health"
          />
        </div>

        {formData.image && (
          <div className="mb-3">
            <strong>🖼️ Image Preview:</strong>
            <div className="border p-2 mt-2 bg-light rounded">
              <img
                src={formData.image}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary me-2">
          {isEditing ? "Update Post" : "Create Post"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/blogs")}
          className="btn btn-secondary"
        >
          ← Back to Admin Dashboard
        </button>
      </form>
    </PageWrapper>
  );
}
