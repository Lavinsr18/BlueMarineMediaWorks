import { motion } from "framer-motion";

export default function MotionText({ children, className = "" }) {
  return (
    <span className={`motion-word ${className}`}>
      {[...children].map((char, i) => (
        <motion.span key={`${char}-${i}`} initial={{ opacity:0, y:35, filter:"blur(8px)" }} animate={{ opacity:1, y:0, filter:"blur(0px)" }} transition={{ delay: .025*i, duration:.65, ease:[.22,1,.36,1] }}>{char === " " ? "\u00A0" : char}</motion.span>
      ))}
    </span>
  );
}
