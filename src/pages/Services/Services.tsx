// src/pages/Services.tsx

import PageWrapper from "@components/Layout/PageWrapper";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <PageWrapper>
      <Link to="/" className="text-decoration-none mb-3 d-inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <p className="mb-4">
        We offer a range of tech-driven services designed to empower communities and organizations.
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">🛠️ Custom App Development</li>
        <li className="mb-2">🤖 AI Integration & Training</li>
        <li className="mb-2">💡 Digital Transformation Consulting</li>
        <li className="mb-2">📚 Educational Workshops & Support</li>
      </ul>
    </PageWrapper>
  );
}
