import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '@context/ThemeContext';
import React from 'react'; // still required

const GithubIcon = FaGithub as React.FC;
const LinkedinIcon = FaLinkedin as React.FC;
const EmailIcon = FaEnvelope as React.FC;

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-light text-center py-3 mt-auto text-muted">
      <p>&copy; {new Date().getFullYear()} Isaac Amoamah Osafo. All rights reserved.</p>
      <div className="footer-icons">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <LinkedinIcon />
        </a>
        <a href="mailto:your@email.com">
          <EmailIcon />
        </a>
      </div>
    </footer>
  );
}
