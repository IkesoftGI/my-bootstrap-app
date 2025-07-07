// src/components/Layout/PageWrapper.tsx

import { motion } from "framer-motion";
import { ReactNode, ElementType } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  headingLevel?: ElementType; // ✅ ElementType is the correct and safe JSX type
}

export default function PageWrapper({
  children,
  title,
  headingLevel: HeadingTag = "h1", // default to h1 if not provided
}: PageWrapperProps) {
  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {title && <HeadingTag className="mb-4 fw-bold text-xl">{title}</HeadingTag>}
      {children}
    </motion.div>
  );
}
