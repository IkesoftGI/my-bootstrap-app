import React, { useEffect, useState } from "react";
import AddPostForm from "../components/AddPostForm";
import { BlogPost } from "../types";

const LOCAL_STORAGE_KEY = "blogPosts";

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage anytime posts change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
  };

  const handleSave = (updatedPost: BlogPost) => {
    if (editingPost) {
      setPosts(prev =>
        prev.map(p => (p.id === updatedPost.id ? updatedPost : p))
      );
      setEditingPost(null);
    } else {
      setPosts(prev => [...prev, updatedPost]);
    }
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };


  return (
    <div>
      <h1>📋 Blog Admin Dashboard</h1>
      <AddPostForm
        onSave={handleSave}
        editingPost={editingPost}
        cancelEdit={() => setEditingPost(null)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.excerpt}</td>  // ✅ correct

              <td>
                <button onClick={() => handleEdit(post)}>✏️ Edit</button>
                <button onClick={() => handleDelete(post.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
