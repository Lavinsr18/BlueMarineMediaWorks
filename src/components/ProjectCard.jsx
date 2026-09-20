import { motion } from "framer-motion";
export default function ProjectCard({ project, index }) {
  return (
    <motion.article className={`project-card ${index % 3 === 1 ? "project-card-offset" : ""}`} initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.12 }} transition={{ duration:.8, ease:[.22,1,.36,1] }}>
      <div className="project-image"><motion.img whileHover={{ scale:1.045 }} transition={{ duration:1.1 }} src={project.image} alt={project.title} loading="lazy" /></div>
      <div className="project-glass">
        <div><small>{project.tag}</small><h3>{project.title}</h3></div>
        <strong>{project.year}</strong>
      </div>
    </motion.article>
  );
}
