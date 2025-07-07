// src/pages/Blog/BlogHome.tsx

import { Link } from "react-router-dom";
import PageWrapper from "../../components/Layout/PageWrapper";
import { blogPosts as staticPosts, BlogPost } from "../../data/blogs";
import { useEffect, useState } from "react";

export default function BlogHome() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const stored = localStorage.getItem("blogPosts");
    const adminPosts: BlogPost[] = stored ? JSON.parse(stored) : [];
    setPosts([...adminPosts, ...staticPosts]);
  }, []);

  const allCategories = Array.from(
    new Set(posts.flatMap((post) => post.categories || []))
  );

  const filteredPosts = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories?.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCategory = selectedCategory
      ? post.categories?.includes(selectedCategory)
      : true;

    return matchSearch && matchCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat === selectedCategory ? null : cat);
    setCurrentPage(1);
  };

  return (
    <PageWrapper title="📰 Our Blog">
      {/* Header and Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0 text-muted">Explore our latest updates and stories!</p>
        <Link to="/" className="btn btn-outline-secondary btn-sm">← Back to Home</Link>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, summary, or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Category Filter */}
      {allCategories.length > 0 && (
        <div className="mb-4">
          <strong className="me-2">Filter by:</strong>
          <div className="d-flex flex-wrap gap-2">
            {allCategories.map((cat, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${
                  selectedCategory === cat ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
            {selectedCategory && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Blog Cards */}
      {currentPosts.length === 0 ? (
        <p>No blog posts match your filters.</p>
      ) : (
        <div className="row g-4">
          {currentPosts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-muted small">
                    📅 {new Date(post.date).toLocaleDateString()} • ⏱️ {post.readingTime}
                  </p>
                  <p className="card-text">{post.excerpt}</p>
                  {post.categories && (
                    <div className="mb-2">
                      {post.categories.map((cat, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto">
                    <Link to={`/blog/${post.id}`} className="btn btn-outline-primary btn-sm">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredPosts.length > postsPerPage && (
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={goToPrev}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={goToNext}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-muted mt-5">
             </p>
    </PageWrapper>
  );
}
