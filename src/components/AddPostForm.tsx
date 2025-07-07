import React, { useEffect, useState } from "react";
import { BlogPost } from "../types";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";


interface AddPostFormProps {
  onSave: (post: BlogPost) => void;
  editingPost: BlogPost | null;
  cancelEdit: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({
  onSave,
  editingPost,
  cancelEdit,
}) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setSummary(editingPost.summary);
      setContent(editingPost.content);
      setImageUrl(editingPost.imageUrl || "");
    } else {
      setTitle("");
      setSummary("");
      setContent("");
      setImageUrl("");
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const post: BlogPost = {
      id: editingPost ? editingPost.id : uuidv4(),
      title,
      summary,
      content,
      imageUrl,
    };

    onSave(post);
    // Clear form
    setTitle("");
    setSummary("");
    setContent("");
    setImageUrl("");
  };

  return (
    <div>
      <h2>{editingPost ? "✏️ Edit Post" : "➕ Add New Blog Post"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          required
        />
        <label>Content (Markdown supported)</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
          placeholder="Write your blog content here..."
          required
        />

        <div style={{ marginTop: "1rem" }}>
          <strong>📄 Live Preview:</strong>
          <div style={{ padding: "1rem", border: "1px solid #ccc", background: "#f9f9f9" }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <button type="submit">
          {editingPost ? "Update Post" : "Create Post"}
        </button>
        {editingPost && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddPostForm;
