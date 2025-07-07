// src/pages/NotFound.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@components/Layout/PageWrapper";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/blog/${query.trim().toLowerCase()}`);
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-danger mb-3">404 - Page Not Found</h1>
      <p className="mb-4">Oops! The page you’re looking for doesn’t exist.</p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="d-flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search blog by ID or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <Link to="/" className="btn btn-outline-secondary">
        ← Back to Home
      </Link>
    </PageWrapper>
  );
}
