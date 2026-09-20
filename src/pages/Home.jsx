import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Marquee from "../components/Marquee";
import ProjectCard from "../components/ProjectCard";
import { brand, projects, services, clients } from "../data";
import "../css/home.css";
import heroImage from "../asset/hero.png";
import { Lottie } from "lottie-react";
import logoAnimation from "../asset/logo.json";
import aboutImage from "../asset/img1.png";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease,
    },
  },
};

const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 50,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.15,
      ease,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordReveal = {
  hidden: {
    opacity: 0,
    y: "100%",
    rotateX: -80,
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

function Reveal({
  children,
  className = "",
  variant = fadeUp,
  amount = 0.18,
}) {
  return (
    <motion.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount,
      }}
    >
      {children}
    </motion.div>
  );
}

function SplitReveal({ children, className = "" }) {
  const words = children.split(" ");

  return (
    <motion.span
      className={`bm-split-reveal ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.35,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.055,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span className="bm-word-mask" key={`${word}-${index}`}>
          <motion.span variants={wordReveal}>{word}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function ImageReveal({
  src,
  alt = "",
  className = "",
  parallax = true,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={ref}
      className={`bm-image-reveal ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={parallax ? { y } : undefined}
        initial={{
          scale: 1.18,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.6,
          ease,
        }}
      />

      <motion.div
        className="bm-image-wipe"
        initial={{
          scaleY: 1,
        }}
        whileInView={{
          scaleY: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease,
        }}
      />
    </div>
  );
}

function MagneticButton({ children, to }) {
  return (
    <motion.div
      className="bm-magnetic-wrap"
      whileHover={{
        scale: 1.04,
      }}
      transition={{
        duration: 0.45,
        ease,
      }}
    >
      <Link to={to} className="bm-cta-button">
        <span>{children}</span>
        <motion.span
          className="bm-button-arrow"
          whileHover={{
            rotate: 45,
          }}
        >
          ↗
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"]
  );

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.12]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0]
  );

  const smoothScale = useSpring(heroScale, {
    stiffness: 80,
    damping: 20,
  });

  return (
    <main className="bm-home">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="bm-hero"
      >
     <div className="bm-hero-bg">

  <motion.div
    className="bm-hero-image"
    style={{
      y: heroImageY,
      scale: smoothScale,
    }}
    initial={{
      scale: 1.08,
      opacity: 0,
      filter: "blur(10px)",
    }}
    animate={{
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    }}
    transition={{
      duration: 1.8,
      ease,
    }}
  >
   <img
  src={heroImage}
  alt="Blue Marine Mediaworks"
/>

    {/* Blue magnetic atmosphere */}
    <div className="bm-hero-energy" />

    {/* Moving light sweep */}
    <motion.div
      className="bm-hero-light"
      animate={{
        x: ["-40%", "140%", "-40%"],
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Subtle scan */}
    <motion.div
      className="bm-hero-scan"
      animate={{
        y: ["-120%", "220%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </motion.div>

  <div className="bm-hero-overlay" />

  <motion.div
    className="bm-hero-blue-glow"
    animate={{
      x: ["-10%", "20%", "-10%"],
      y: ["0%", "15%", "0%"],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

</div>
        <motion.div
          className="bm-hero-content"
          style={{
            opacity: heroOpacity,
          }}
        >
          <motion.div
            className="bm-hero-top"
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease,
            }}
          >
            <span>CREATIVE COMMUNICATION</span>
            <span>MEDIA · DIGITAL · BRANDING</span>
          </motion.div>

          <div className="bm-hero-title">

            <div className="bm-title-line">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 120,
                  rotateX: -70,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.25,
                  delay: 0.25,
                  ease,
                }}
              >
                BLUE
              </motion.h1>
            </div>

            <div className="bm-title-line bm-title-offset">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 120,
                  rotateX: -70,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.25,
                  delay: 0.4,
                  ease,
                }}
              >
                MARINE
              </motion.h1>
            </div>

            <motion.div
              className="bm-hero-subtitle"
              initial={{
                opacity: 0,
                x: -50,
                letterSpacing: "0.7em",
              }}
              animate={{
                opacity: 1,
                x: 0,
                letterSpacing: "0.3em",
              }}
              transition={{
                duration: 1.2,
                delay: 0.9,
                ease,
              }}
            >
              MEDIAWORKS
            </motion.div>

          </div>

          <motion.div
            className="bm-hero-description"
            initial={{
              opacity: 0,
              x: 60,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              delay: 1,
              ease,
            }}
          >
            <span>SCROLL TO EXPLORE ↓</span>

            <p>
              We create visual stories, digital experiences
              and communication systems that help ambitious
              brands move forward.
            </p>
          </motion.div>

          <motion.div
            className="bm-hero-number"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 1.1,
              ease,
            }}
          >
            <strong>14+</strong>

            <span>
              YEARS OF
              <br />
              EXPERIENCE
            </span>
          </motion.div>

          <motion.div
            className="bm-scroll-indicator"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.5,
              duration: 1,
            }}
          >
            <motion.span
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>

        <div className="bm-hero-bottom-line" />
      </section>


      {/* =====================================================
          BRAND STATEMENT
      ===================================================== */}

      <section className="bm-statement-section">

        <div className="bm-section-meta">
          <span>01 / THE IDEA</span>
          <span>STORY · IMAGE · IMPACT</span>
        </div>

        <div className="bm-statement-layout">

          <Reveal>
         
    <Lottie
  src={logoAnimation}
  loop
  autoplay
/>
          </Reveal>

          <div className="bm-statement-heading">
            <SplitReveal>
              A strong brand is more than a logo.
            </SplitReveal>

            <motion.div
              className="bm-statement-large"
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease,
              }}
            >
              It is a perception built through
              <span> every image,</span>
              <span> every message,</span>
              <span> every experience.</span>
            </motion.div>
          </div>

        </div>

        <motion.div
          className="bm-statement-line"
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.3,
            ease,
          }}
        />
      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}
<section className="bm-about-section">

  <div className="bm-section-meta">
    <span>02 / ABOUT</span>
    <span>BLUE MARINE MEDIAWORKS</span>
  </div>

  <div className="bm-about-grid">

    {/* LEFT — TITLE + IMAGE */}
    <Reveal>
      <div className="bm-about-heading">

        <small>WE CREATE</small>

        <h2>
          Stories that <em> move.</em>
        </h2>

        <div className="bm-about-image-wrap">
          <ImageReveal
            src={aboutImage}
            alt="Blue Marine Mediaworks creative team"
            className="bm-about-image"
          />

          <motion.div
            className="bm-about-image-label"
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease,
            }}
          >
            PEOPLE · IDEAS · STORIES
          </motion.div>
        </div>

      </div>
    </Reveal>

    {/* RIGHT — ABOUT CONTENT */}
    <Reveal>
      <div className="bm-about-copy">

        <p className="large">
          Creating stories, shaping brands and building
          experiences that people remember.
        </p>

        <p>
          {brand.promise} We bring together communication,
          media production, creative strategy, branding
          and digital expertise under one roof.
        </p>

        <p>
          Since 2012, Blue Marine Mediaworks has evolved
          from a creative production-driven company into
          a multidisciplinary media partner.
        </p>

        <Link
          to="/about"
          className="bm-text-link"
        >
          Discover Blue Marine
          <span>↗</span>
        </Link>

      </div>
    </Reveal>

  </div>

  <div className="bm-about-floating-word">
    STORY
  </div>

</section>

      {/* =====================================================
          FOUNDER / ORIGIN
      ===================================================== */}

      <section className="bm-origin-section">

        <div className="bm-origin-bg">
          <div className="bm-origin-gradient" />
        </div>

        <div className="bm-origin-content">

          <div className="bm-section-meta bm-meta-light">
            <span>03 / THE ORIGIN</span>
            <span>A DREAM BECAME A COMPANY</span>
          </div>

          <Reveal>
            <p className="bm-origin-kicker">
              BEFORE THE CAMERAS,
              <br />
              THERE WAS A DREAM.
            </p>
          </Reveal>

          <motion.h2
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1.3,
              ease,
            }}
          >
            From a small-town
            <br />
            <em>dream</em> to a
            <br />
            creative house.
          </motion.h2>

          <div className="bm-origin-bottom">

            <p>
              Blue Marine began with a creative ambition in
              2012 and grew through theatre, media, television,
              production and years of learning.
            </p>

            <Link
              to="/founder"
              className="bm-light-link"
            >
              Read the story
              <span>↗</span>
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURED VISUAL
      ===================================================== */}

      <section className="bm-feature-section">

        <div className="bm-feature-image">

          <ImageReveal
            src={
              projects[1]?.image ||
              projects[0]?.image
            }
            alt="Blue Marine creative work"
          />

          <motion.div
            className="bm-feature-card"
            initial={{
              opacity: 0,
              y: 90,
              scale: 0.82,
              rotate: -4,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 1.1,
              ease,
            }}
          >
            <span>CREATIVE DIRECTION</span>

            <strong>
              BEYOND
              <br />
              THE FRAME
            </strong>

            <small>01</small>

            <motion.div
              className="bm-card-orb"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />
          </motion.div>

          <motion.div
            className="bm-feature-label"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
          >
            VISUAL
            <br />
            STORYTELLING
          </motion.div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="bm-services-section">

        <div className="bm-section-meta">
          <span>04 / SERVICES</span>
          <span>FROM IDEA TO IMPACT</span>
        </div>

        <div className="bm-services-header">

          <Reveal>
            <h2>
              Everything a brand
              <br />
              needs to
              <em> be seen.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              Strategy, storytelling, production, digital
              communication and technology — brought together
              under one creative ecosystem.
            </p>
          </Reveal>

        </div>

        <motion.div
          className="bm-service-list"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
        >

          {services.map((service, index) => {

            const route =
              service.no === "01"
                ? "/services/film-video"
                : service.no === "02"
                ? "/services/advertising"
                : service.no === "03"
                ? "/services/media-digital"
                : service.no === "04"
                ? "/services/web-development"
                : "/about";

            return (
              <motion.div
                variants={fadeUp}
                key={service.no}
              >
                <Link
                  to={route}
                  className="bm-service-item"
                >

                  <div className="bm-service-number">
                    {service.no}
                  </div>

                  <div className="bm-service-main">
                    <h3>{service.title}</h3>

                    <p>
                      {service.description}
                    </p>
                  </div>

                  <motion.div
                    className="bm-service-arrow"
                    whileHover={{
                      rotate: 45,
                      scale: 1.2,
                    }}
                  >
                    ↗
                  </motion.div>

                  <div className="bm-service-image">
                    <img
                      src={service.image}
                      alt={service.title}
                    />

                    <div className="bm-service-image-overlay" />
                  </div>

                </Link>
              </motion.div>
            );
          })}

        </motion.div>
      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="bm-process-section">

        <div className="bm-process-bg-text">
          PROCESS
        </div>

        <div className="bm-section-meta bm-meta-light">
          <span>05 / OUR METHOD</span>
          <span>HOW WE CREATE</span>
        </div>

        <Reveal>
          <h2>
            We start with
            <br />
            <em>questions.</em>
          </h2>
        </Reveal>

        <div className="bm-process-grid">

          {[
            ["01", "UNDERSTAND"],
            ["02", "DEFINE"],
            ["03", "DISCOVER"],
            ["04", "CREATE"],
            ["05", "PRODUCE"],
            ["06", "IMPACT"],
          ].map(([number, title], index) => (

            <motion.div
              className="bm-process-item"
              key={number}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease,
              }}
            >
              <span>{number}</span>

              <strong>{title}</strong>

              <motion.div
                className="bm-process-dot"
                whileInView={{
                  scale: [0, 1.3, 1],
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.3 + index * 0.08,
                }}
              />
            </motion.div>

          ))}

        </div>
      </section>


      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <section className="bm-marquee-section">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease,
          }}
        >
          <Marquee
            items={[
              "Film Production",
              "Advertising",
              "Media Planning",
              "Digital Marketing",
              "Web Development",
              "Creative Design",
              "Brand Strategy",
              "Storytelling",
            ]}
          />
        </motion.div>

      </section>


      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section className="bm-projects-section">

        <div className="bm-section-meta">

          <span>
            06 / SELECTED WORK
          </span>

          <Link to="/projects">
            VIEW ALL PROJECTS ↗
          </Link>

        </div>

        <Reveal>
          <div className="bm-project-heading">

            <h2>
              Work that
              <br />
              <em>speaks.</em>
            </h2>

            <p>
              A selection of projects, campaigns and digital
              experiences created with purpose.
            </p>

          </div>
        </Reveal>

        <motion.div
          className="bm-project-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
        >

          {projects
            .slice(0, 4)
            .map((project, index) => (

              <motion.div
                variants={fadeScale}
                key={project.title}
                className={`bm-project-wrapper project-${
                  index + 1
                }`}
                whileHover={{
                  y: -12,
                }}
                transition={{
                  duration: 0.5,
                  ease,
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                />
              </motion.div>

            ))}

        </motion.div>

      </section>


      {/* =====================================================
          NUMBERS
      ===================================================== */}

      <section className="bm-numbers-section">

        <div className="bm-section-meta bm-meta-light">
          <span>07 / BY THE NUMBERS</span>
          <span>BLUE MARINE</span>
        </div>

        <div className="bm-numbers-grid">

          {[
            ["2012", "SINCE"],
            ["14+", "YEARS"],
            ["20+", "YEARS FOUNDER EXPERIENCE"],
            ["17K+", "YOUTUBE SUBSCRIBERS"],
          ].map(([number, label], index) => (

            <motion.div
              className="bm-number-item"
              key={label}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.1,
                ease,
              }}
            >

              <strong>{number}</strong>

              <span>{label}</span>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          CLIENTS
      ===================================================== */}

      <section className="bm-clients-section">

        <div className="bm-section-meta">
          <span>08 / CLIENTS</span>
          <span>TRUSTED ALLIES</span>
        </div>

        <Reveal>
          <h2>
            Trusted by
            <br />
            <em>ambitious brands.</em>
          </h2>
        </Reveal>

        <div className="bm-client-marquees">

          <Marquee items={clients} />

          <Marquee
            reverse
            items={clients.slice().reverse()}
          />

        </div>

      </section>


      {/* =====================================================
          FUTURE / THE INITIATOR
      ===================================================== */}

      <section className="bm-future-section">

        <div className="bm-future-orbit orbit-one" />
        <div className="bm-future-orbit orbit-two" />
        <div className="bm-future-grid" />

        <div className="bm-future-content">

          <div className="bm-section-meta bm-meta-light">
            <span>09 / THE FUTURE</span>
            <span>COMING SOON</span>
          </div>

          <motion.div
            className="bm-future-kicker"
            initial={{
              opacity: 0,
              letterSpacing: "0.4em",
            }}
            whileInView={{
              opacity: 1,
              letterSpacing: "0.16em",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              ease,
            }}
          >
            THE NEXT ERA OF MEDIA
          </motion.div>

          <Reveal>
            <h2>
              THE
              <br />
              <span>INITIATOR</span>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              Where information meets storytelling.
              <br />
              Where stories are explored, understood
              and presented with perspective.
            </p>
          </Reveal>

          <motion.div
            className="bm-coming-soon"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            COMING SOON
          </motion.div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bm-cta-section">

        <div className="bm-cta-bg">

          <motion.div
            className="bm-cta-orb orb-a"
            animate={{
              x: [0, 80, 0],
              y: [0, -50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="bm-cta-orb orb-b"
            animate={{
              x: [0, -60, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </div>

        <div className="bm-section-meta bm-meta-light">
          <span>10 / LET'S CREATE</span>
          <span>START SOMETHING</span>
        </div>

        <Reveal>
          <h2>
            Your brand has
            <br />
            a <em>story.</em>
          </h2>
        </Reveal>

        <Reveal>
          <p>
            Let's make it impossible to ignore.
          </p>
        </Reveal>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
        >
          <MagneticButton to="/contact">
            START A PROJECT
          </MagneticButton>
        </motion.div>

      </section>

    </main>
  );
}