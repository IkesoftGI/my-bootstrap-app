// src/pages/Contact.tsx

import PageWrapper from "@components/Layout/PageWrapper";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <PageWrapper>
      <Link to="/" className="text-decoration-none mb-3 d-inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We'd love to hear from you! Reach out with questions, partnership ideas, or support requests.
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">📧 Email: hello@myapp.com</li>
        <li className="mb-2">📞 Phone: +233 20 123 4567</li>
        <li className="mb-2">🏢 Address: Accra, Ghana</li>
      </ul>
    </PageWrapper>
  );
}
