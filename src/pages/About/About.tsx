// src/pages/About.tsx

import PageWrapper from "@components/Layout/PageWrapper";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <PageWrapper>
      <Link to="/" className="text-decoration-none mb-3 d-inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        At MyApp, we believe in the power of simple, smart, and scalable technology
        to transform communities. Our journey started with one goal: to bridge the gap
        between innovation and everyday life.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">🎯 Our Vision</h2>
      <p>
        To become a leading force in using technology to promote social impact,
        especially in underserved areas.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">🤝 Our Team</h2>
      <p>
        We are a group of passionate creators, developers, and change-makers committed
        to building tools that matter.
      </p>
    </PageWrapper>
  );
}
