import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { projects } from "../data";
import "../css/project.css";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}

function ProjectItem({ project, index }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.06, 1, 1.06]
  );

  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      className={`bm-project-card bm-project-card-${index + 1}`}
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 1,
        ease,
      }}
    >
      <Link
        to={`/projects/${project.slug || index + 1}`}
        className="bm-project-card-link"
      >

        <div className="bm-project-image-wrap">

          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              y: imageY,
              scale: imageScale,
            }}
            loading={index > 1 ? "lazy" : "eager"}
          />

          <div className="bm-project-image-overlay" />

          <div className="bm-project-hover">

            <span>VIEW PROJECT</span>

            <motion.div
              className="bm-project-hover-arrow"
              whileHover={{
                rotate: 45,
              }}
            >
              ↗
            </motion.div>

          </div>

          <div className="bm-project-index">
            {number}
          </div>

        </div>

        <div className="bm-project-info">

          <div>
            <span className="bm-project-category">
              {project.category ||
                project.type ||
                "CREATIVE PROJECT"}
            </span>

            <h2>
              {project.title}
            </h2>
          </div>

          <div className="bm-project-meta">

            <span>
              {project.year || "—"}
            </span>

            <span>
              ↗
            </span>

          </div>

        </div>

      </Link>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <main className="bm-projects-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bm-projects-hero">

        <div className="bm-projects-hero-top">
          <span>BLUE MARINE MEDIAWORKS</span>
          <span>SELECTED WORK / 01</span>
        </div>

        <div className="bm-projects-hero-content">

          <motion.div
            className="bm-projects-eyebrow"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            OUR WORK
          </motion.div>

          <div className="bm-projects-hero-title">

            <div className="bm-project-title-mask">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                  ease,
                }}
              >
                IDEAS
              </motion.h1>
            </div>

            <div className="bm-project-title-mask bm-project-title-indent">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease,
                }}
              >
                MADE
              </motion.h1>
            </div>

            <div className="bm-project-title-mask">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.55,
                  ease,
                }}
              >
                VISIBLE.
              </motion.h1>
            </div>

          </div>

          <motion.div
            className="bm-projects-hero-bottom"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.9,
              ease,
            }}
          >
            <p>
              A selection of films, campaigns, brand
              stories and creative experiences crafted
              by Blue Marine Mediaworks.
            </p>

            <span>
              {projects.length} PROJECTS
            </span>
          </motion.div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="bm-projects-intro">

        <div className="bm-projects-meta">
          <span>01 / SELECTED WORK</span>
          <span>STORY · CRAFT · IMPACT</span>
        </div>

        <div className="bm-projects-intro-grid">

          <Reveal>
            <span className="bm-project-small">
              THE WORK
            </span>
          </Reveal>

          <Reveal>
            <h2>
              Every project
              <br />
              starts with a
              <br />
              <em>story.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              From corporate films and industrial
              storytelling to advertising, digital content
              and brand communication — our work begins
              with understanding what matters.
            </p>
          </Reveal>

        </div>

      </section>


      {/* =====================================================
          PROJECT GRID
      ===================================================== */}

      <section className="bm-project-list-section">

        <div className="bm-project-list">

          {projects.map((project, index) => (
            <ProjectItem
              key={
                project.id ||
                project.slug ||
                `${project.title}-${index}`
              }
              project={project}
              index={index}
            />
          ))}

        </div>

      </section>


      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="bm-project-statement">

        <div className="bm-project-statement-line">
          <span>CREATIVE DIRECTION</span>
          <span>BLUE MARINE</span>
        </div>

        <Reveal>
          <h2>
            Not just
            <br />
            something to
            <br />
            <em>watch.</em>
          </h2>
        </Reveal>

        <Reveal>
          <p>
            Work designed to connect, communicate and
            stay with the audience long after the screen
            goes dark.
          </p>
        </Reveal>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bm-projects-cta">

        <div className="bm-projects-cta-glow" />

        <div className="bm-projects-cta-content">

          <span>
            HAVE A PROJECT IN MIND?
          </span>

          <Reveal>
            <h2>
              LET'S MAKE
              <br />
              SOMETHING
              <br />
              <em>MEMORABLE.</em>
            </h2>
          </Reveal>

          <Link
            to="/contact"
            className="bm-projects-cta-button"
          >
            START YOUR PROJECT
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
}