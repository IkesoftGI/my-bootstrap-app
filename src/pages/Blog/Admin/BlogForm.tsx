// src/pages/Blog/Admin/BlogForm.tsx

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "@components/Layout/PageWrapper";
import { BlogPost } from "../../../data/blogs";

// ✅ Add these at the top (after imports)
const LOCAL_STORAGE_KEY = "blogPosts";
const DRAFT_KEY = "blogPostDraft";

const defaultPost: BlogPost = {
  id: "",
  title: "",
  excerpt: "",
  content: "",
  author: "",
  date: new Date().toISOString(),
  readingTime: "1 min read",
  categories: [],
  comments: [],
};

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost>(defaultPost);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!id) return;
    useEffect(() => {
  if (!id) {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      setPost(JSON.parse(draft));
    }
  }
}, []);

useEffect(() => {
  if (!id) {
    const interval = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(post));
      console.log("Auto-saved draft...");
    }, 3000); // every 3 seconds

    

    return () => clearInterval(interval); // cleanup
  }
}, [post]);


    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const allPosts: BlogPost[] = JSON.parse(stored);
      const existing = allPosts.find((p) => p.id === id);
      if (existing) {
        setPost(existing);
        setIsEdit(true);
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updated = post.categories?.includes(value)
      ? post.categories.filter((cat) => cat !== value)
      : [...(post.categories || []), value];
    setPost((prev) => ({ ...prev, categories: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const allPosts: BlogPost[] = stored ? JSON.parse(stored) : [];
  
    
    const updatedPosts = isEdit
      ? allPosts.map((p) => (p.id === post.id ? post : p))
      : [...allPosts, { ...post, id: Date.now().toString() }];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
    navigate("/admin/blogs");
  };

  const categoryOptions = [
    "AI",
    "Education",
    "Ghana",
    "Rural Development",
    "Technology",
    "Innovation",
    "Public Health",
    "Civic Tech",
    "Data",
    "Impact",
    "Career",
    "Digital Skills",
    "Growth",
    "Smart Work",
    "Productivity",
    "GLP Project",
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl fw-bold mb-4">
        {isEdit ? "✏️ Edit Blog Post" : "➕ Create New Blog Post"}
      </h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Excerpt</label>
          <textarea
            className="form-control"
            name="excerpt"
            value={post.excerpt}
            onChange={handleChange}
            rows={2}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Reading Time</label>
          <input
            type="text"
            className="form-control"
            name="readingTime"
            value={post.readingTime}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL (optional)</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={post.image || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content (Markdown supported)</label>
          <textarea
            className="form-control mb-2"
            name="content"
            value={post.content}
            onChange={handleChange}
            rows={8}
            required
          />

          <label className="form-label mt-3">📄 Live Preview:</label>
          <div className="p-3 border rounded bg-light" style={{ minHeight: "150px" }}>
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="h3 mt-3" {...props} />,
                h2: ({ node, ...props }) => <h2 className="h4 mt-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="h5 mt-3" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Categories</label>
          <div className="d-flex flex-wrap gap-2">
            {categoryOptions.map((cat) => (
              <div key={cat} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={cat}
                  value={cat}
                  checked={post.categories?.includes(cat)}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label" htmlFor={cat}>
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "💾 Save Changes" : "✅ Create Post"}
        </button>
      </form>
    </PageWrapper>
  );
}


