// src/pages/Blog/Admin/BlogAdmin.tsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "@components/Layout/PageWrapper";
import { blogPosts as staticPosts, BlogPost } from "../../../data/blogs";

const LOCAL_STORAGE_KEY = "blogPosts";

export default function BlogAdmin() {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [localOnlyPosts, setLocalOnlyPosts] = useState<BlogPost[]>([]); // For deletions

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localPosts: BlogPost[] = stored ? JSON.parse(stored) : [];
    setLocalOnlyPosts(localPosts);
    setAllPosts([...localPosts, ...staticPosts]);
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const updatedLocal = localOnlyPosts.filter((p) => p.id !== id);
    setLocalOnlyPosts(updatedLocal);
    setAllPosts([...updatedLocal, ...staticPosts]);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));
  };

  const handleSort = (by: "title" | "date") => {
    const sorted = [...allPosts].sort((a, b) => {
      return by === "title"
        ? a.title.localeCompare(b.title)
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setAllPosts(sorted);
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-4">📋 Blog Admin Dashboard</h1>

      <div className="d-flex justify-content-between mb-3">
        <Link to="/admin/blog/new" className="btn btn-success">
          ➕ Create New Post
        </Link>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => handleSort("title")}>Sort by Title</button>
          <button className="btn btn-outline-secondary" onClick={() => handleSort("date")}>Sort by Date</button>
        </div>
      </div>

      {allPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Excerpt</th>
              <th>Author</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post) => {
              const isLocal = localOnlyPosts.some((p) => p.id === post.id);
              return (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.excerpt}</td>
                  <td>{post.author}</td>
                  <td>
                    {post.categories?.map((cat, idx) => (
                      <span key={idx} className="badge bg-secondary me-1">{cat}</span>
                    ))}
                  </td>
                  <td className="d-flex gap-2">
                    {isLocal && (
                      <>
                        <Link to={`/admin/blog/${post.id}`} className="btn btn-primary btn-sm">
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="btn btn-danger btn-sm"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                    <Link to={`/blog/${post.id}`} className="btn btn-secondary btn-sm" target="_blank">
                      👁️ Preview
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <p className="text-center text-muted mt-5">
        © 2025 Isaac Amoamah Osafo. All rights reserved.
      </p>
    </PageWrapper>
  );
}
