// src/pages/Blog/Admin/Dashboard.tsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "@components/Layout/PageWrapper";
import { BlogPost } from "../../../data/blogs";

const LOCAL_STORAGE_KEY = "blogPosts";

export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const loadedPosts: BlogPost[] = stored ? JSON.parse(stored) : [];
    setPosts(loadedPosts);
  }, []);

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <PageWrapper title="📋 Blog Admin Dashboard" headingLevel="h1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h5 mb-0">Manage Blog Posts</h2>
        <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
          ➕ Add New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.excerpt}</td>
                <td>
                  <Link to={`/admin/blogs/${post.id}`} className="btn btn-sm btn-outline-info me-2">
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="text-center text-muted mt-4">
        © 2025 Isaac Amoamah Osafo. All rights reserved.
      </p>
    </PageWrapper>
  );
}
