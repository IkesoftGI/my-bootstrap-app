// src/pages/Blog/BlogDetails.tsx

import { useParams, Link } from "react-router-dom";
import PageWrapper from "../../components/Layout/PageWrapper";
import { blogPosts as staticPosts, BlogPost, Comment } from "../../data/blogs";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();

  const stored = localStorage.getItem("blogPosts");
  const adminPosts: BlogPost[] = stored ? JSON.parse(stored) : [];

  const allPosts: BlogPost[] = [...staticPosts, ...adminPosts];
  const post = allPosts.find((p) => p.id === id);

  const [commentForm, setCommentForm] = useState({ name: "", message: "" });

  if (!post) {
    return (
      <PageWrapper title="404 - Blog Not Found">
        <p>Sorry, we couldn’t find the blog post you were looking for.</p>
        <Link to="/blog" className="btn btn-secondary mt-3">← Back to Blog</Link>
      </PageWrapper>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = commentForm;
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    };

    const updatedPosts = allPosts.map((p) => {
      if (p.id === post.id) {
        return {
          ...p,
          comments: [...(p.comments || []), newComment],
        };
      }
      return p;
    });

    const updatedAdmin = updatedPosts.filter((p) =>
      adminPosts.some((a) => a.id === p.id)
    );

    localStorage.setItem("blogPosts", JSON.stringify(updatedAdmin));
    setCommentForm({ name: "", message: "" });
    window.location.reload(); // Simple refresh to show the new comment
  };

  return (
    <PageWrapper title={post.title}>
      <Link to="/blog" className="btn btn-secondary mb-4">← Back to Blog</Link>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      )}

      <p className="text-muted mb-2 small">
        📅 {new Date(post.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} • ⏱️ {post.readingTime} • ✍️ {post.author}
      </p>

      {post.excerpt && <p className="text-muted mb-4">{post.excerpt}</p>}

      <div className="blog-markdown-content mb-5">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="h3 mt-4 mb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="h4 mt-4 mb-2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="h5 mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="mb-3" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {post.categories && post.categories.length > 0 && (
        <div className="mb-4">
          <strong>📂 Categories:</strong>{" "}
          {post.categories.map((cat, idx) => (
            <span key={idx} className="badge bg-secondary me-2">
              {cat}
            </span>
          ))}
        </div>
      )}

      <hr className="my-4" />
      <h5 className="mb-3">💬 Comments ({post.comments?.length || 0})</h5>

      {post.comments && post.comments.length > 0 ? (
        <ul className="list-group mb-4">
          {post.comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              <strong>{comment.name}</strong> <br />
              <small className="text-muted">{new Date(comment.date).toLocaleString()}</small>
              <p className="mb-1">{comment.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No comments yet. Be the first to comment!</p>
      )}

      <form onSubmit={handleAddComment}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={commentForm.name}
            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Comment</label>
          <textarea
            className="form-control"
            rows={3}
            value={commentForm.message}
            onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Post Comment</button>
      </form>
    </PageWrapper>
  );
}
