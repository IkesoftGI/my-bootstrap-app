import { motion } from "framer-motion";
import "./Testimonials.css";

export default function Testimonials() {
  return (
    <motion.div
      className="testimonials-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1>💬 What People Are Saying</h1>
      <div className="testimonial-list">
        <div className="testimonial-card">
          <p>"This app is a game-changer! I use it daily."</p>
          <span>– Sarah K., Developer</span>
        </div>
        <div className="testimonial-card">
          <p>"I love the clean design and simplicity. Highly recommend!"</p>
          <span>– James A., Designer</span>
        </div>
        <div className="testimonial-card">
          <p>"Helped me stay organized and productive."</p>
          <span>– Linda G., Project Manager</span>
        </div>
      </div>
    </motion.div>
  );
}
