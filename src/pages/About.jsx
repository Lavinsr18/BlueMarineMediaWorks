import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { projects } from "../data";
import "../css/about.css";

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

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function Reveal({
  children,
  className = "",
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
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

function SplitText({ children }) {
  const words = children.split(" ");

  return (
    <motion.span
      className="bm-about-split"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
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
        <span
          className="bm-about-word-mask"
          key={`${word}-${index}`}
        >
          <motion.span
            variants={{
              hidden: {
                y: "110%",
                opacity: 0,
              },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.75,
                  ease,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function About() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.12]
  );

  return (
    <main className="bm-about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="bm-about-hero"
      >
        <div className="bm-about-hero-image">
          <motion.img
            src={projects[0]?.image}
            alt="Blue Marine Mediaworks"
            style={{
              y: imageY,
              scale: imageScale,
            }}
            initial={{
              scale: 1.18,
              opacity: 0,
              filter: "blur(12px)",
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
          />
        </div>

        <div className="bm-about-hero-overlay" />

        <div className="bm-about-hero-content">

          <div className="bm-about-topline">
            <span>ABOUT BLUE MARINE</span>
            <span>EST. 2012 · DELHI NCR</span>
          </div>

          <div className="bm-about-hero-title">

            <div className="bm-about-title-mask">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.2,
                  ease,
                }}
              >
                WHERE
              </motion.h1>
            </div>

            <div className="bm-about-title-mask bm-about-title-indent">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.35,
                  ease,
                }}
              >
                STORIES
              </motion.h1>
            </div>

            <div className="bm-about-title-mask">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.5,
                  ease,
                }}
              >
                TAKE FLIGHT.
              </motion.h1>
            </div>

          </div>

          <motion.div
            className="bm-about-hero-bottom"
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
              delay: 1,
              ease,
            }}
          >
            <p>
              Blue Marine Mediaworks is a creative force
              turning bold ideas into powerful visual
              experiences.
            </p>

            <span>
              SCROLL TO DISCOVER
              <br />
              ↓
            </span>
          </motion.div>

        </div>
      </section>


      {/* =====================================================
          GENESIS
      ===================================================== */}

      <section className="bm-about-genesis">

        <div className="bm-about-section-meta">
          <span>01 / THE GENESIS</span>
          <span>OUR FOUNDATION</span>
        </div>

        <div className="bm-genesis-grid">

          <Reveal>
            <div className="bm-genesis-number">
              <span>EST.</span>
              <strong>2012</strong>
            </div>
          </Reveal>

          <div className="bm-genesis-content">

            <Reveal>
              <h2>
                From a quiet town
                <br />
                to a creative
                <br />
                <em>force.</em>
              </h2>
            </Reveal>

            <Reveal>
              <p className="bm-genesis-lead">
                What began as a small creative unit has
                evolved into a full-spectrum media house
                built around one simple belief:
              </p>
            </Reveal>

            <Reveal>
              <blockquote>
                “Stories have the power
                to transform.”
              </blockquote>
            </Reveal>

            <Reveal>
              <p>
                Since 2012, Blue Marine Mediaworks has
                grown through filmmaking, advertising,
                branding, digital communication and
                visual storytelling.
              </p>
            </Reveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          ETHOS
      ===================================================== */}

      <section className="bm-about-ethos">

        <div className="bm-about-section-meta bm-light-meta">
          <span>02 / THE ETHOS</span>
          <span>CREATIVITY MEETS CONVICTION</span>
        </div>

        <div className="bm-ethos-heading">

          <Reveal>
            <span className="bm-small-label">
              WE ARE NOT JUST CONTENT CREATORS.
            </span>
          </Reveal>

          <SplitText>
            We are experience architects.
          </SplitText>

        </div>

        <div className="bm-ethos-description">

          <Reveal>
            <p>
              We blend strategy with soul, craft with
              courage, and vision with precision.
            </p>
          </Reveal>

          <Reveal>
            <p>
              Every project starts by understanding the
              business, the audience and the story behind
              the brand.
            </p>
          </Reveal>

        </div>

        <motion.div
          className="bm-ethos-pillars"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >

          <motion.div
            className="bm-ethos-card"
            variants={fadeUp}
          >
            <span>01</span>
            <h3>
              Creativity
            </h3>
            <p>
              Ideas that refuse to settle for the obvious.
            </p>
          </motion.div>

          <motion.div
            className="bm-ethos-card"
            variants={fadeUp}
          >
            <span>02</span>
            <h3>
              Trust
            </h3>
            <p>
              Relationships earned through consistent
              excellence.
            </p>
          </motion.div>

          <motion.div
            className="bm-ethos-card"
            variants={fadeUp}
          >
            <span>03</span>
            <h3>
              Impact
            </h3>
            <p>
              Communication designed to create a lasting
              impression.
            </p>
          </motion.div>

        </motion.div>

      </section>


      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="bm-about-story">

        <div className="bm-about-section-meta">
          <span>03 / OUR STORY</span>
          <span>THE JOURNEY</span>
        </div>

        <div className="bm-story-intro">

          <Reveal>
            <span className="bm-small-label">
              EVERY BRAND HAS A STORY.
            </span>
          </Reveal>

          <Reveal>
            <h2>
              We find it.
              <br />
              We shape it.
              <br />
              <em>We make it matter.</em>
            </h2>
          </Reveal>

        </div>

        <div className="bm-story-columns">

          <Reveal>
            <div className="bm-story-column">
              <span>01</span>
              <h3>THE BEGINNING</h3>
              <p>
                Blue Marine began with a dream to create,
                direct and bring stories to life.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bm-story-column">
              <span>02</span>
              <h3>THE EVOLUTION</h3>
              <p>
                Film and production expanded into
                advertising, digital communication,
                branding and creative solutions.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bm-story-column">
              <span>03</span>
              <h3>THE FUTURE</h3>
              <p>
                A growing creative ecosystem where
                filmmaking, technology, storytelling and
                strategic brand thinking come together.
              </p>
            </div>
          </Reveal>

        </div>

      </section>


      {/* =====================================================
          WHY BLUE MARINE
      ===================================================== */}

      <section className="bm-about-why">

        <div className="bm-about-section-meta bm-light-meta">
          <span>04 / WHY BLUE MARINE</span>
          <span>OUR DIFFERENCE</span>
        </div>

        <div className="bm-why-heading">

          <Reveal>
            <h2>
              STORY
              <br />
              <span>FIRST.</span>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              We don't start with equipment.
              <br />
              We start with the story.
            </p>
          </Reveal>

        </div>

        <div className="bm-why-grid">

          {[
            {
              number: "01",
              title: "STORY FIRST",
              text:
                "We begin by understanding the story before choosing the medium.",
            },
            {
              number: "02",
              title: "INDUSTRY UNDERSTANDING",
              text:
                "We understand the business before we communicate it.",
            },
            {
              number: "03",
              title: "END-TO-END",
              text:
                "Research, scripting, production, editing, graphics, animation, sound and delivery.",
            },
            {
              number: "04",
              title: "CREATIVE + COMMERCIAL",
              text:
                "Creative ambition balanced with business objectives and practical execution.",
            },
            {
              number: "05",
              title: "PEOPLE-POWERED",
              text:
                "Multidisciplinary creative talent assembled around project requirements.",
            },
            {
              number: "06",
              title: "RELATIONSHIP-DRIVEN",
              text:
                "Long-term relationships matter more than one-time transactions.",
            },
          ].map((item, index) => (

            <motion.div
              className="bm-why-card"
              key={item.number}
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.07,
                ease,
              }}
            >

              <span>
                {item.number}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <div className="bm-why-line" />

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          3C
      ===================================================== */}

      <section className="bm-about-3c">

        <div className="bm-about-section-meta">
          <span>05 / THE 3C PHILOSOPHY</span>
          <span>OUR APPROACH</span>
        </div>

        <Reveal>
          <h2>
            CREATIVITY
            <span> × </span>
            QUALITY
            <span> × </span>
            VALUE
          </h2>
        </Reveal>

        <div className="bm-3c-grid">

          <Reveal>
            <div>
              <strong>C</strong>
              <h3>CREATIVITY</h3>
              <p>
                Ideas that make brands different.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <strong>C</strong>
              <h3>COMPETITIVE VALUE</h3>
              <p>
                Solutions designed around practical
                budgets and business realities.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <strong>C</strong>
              <h3>CONSISTENT QUALITY</h3>
              <p>
                A commitment to professional standards
                across every project.
              </p>
            </div>
          </Reveal>

        </div>

      </section>


      {/* =====================================================
          FOUNDER
      ===================================================== */}

      <section className="bm-about-founder">

        <div className="bm-founder-image">
          <img
            src={projects[2]?.image || projects[0]?.image}
            alt="Blue Marine Mediaworks"
          />
          <div className="bm-founder-image-overlay" />
        </div>

        <div className="bm-founder-content">

          <div className="bm-about-section-meta bm-light-meta">
            <span>06 / THE VISIONARY</span>
            <span>SANJAY RATHORE</span>
          </div>

          <Reveal>
            <span className="bm-small-label">
              FOUNDER & INITIATOR
            </span>
          </Reveal>

          <Reveal>
            <h2>
              The dream
              <br />
              <em>changed.</em>
              <br />
              The purpose
              <br />
              didn't.
            </h2>
          </Reveal>

          <Reveal>
            <p>
              From a small-town boy fascinated by cinema
              to a media professional who discovered his
              calling behind the camera, Sanjay Rathore's
              journey became the foundation of Blue Marine
              Mediaworks.
            </p>
          </Reveal>

          <Link
            to="/founder"
            className="bm-founder-link"
          >
            Meet Sanjay Rathore
            <span>↗</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          LEGACY
      ===================================================== */}

      <section className="bm-about-legacy">

        <div className="bm-about-section-meta">
          <span>07 / THE LEGACY</span>
          <span>BEYOND BUSINESS</span>
        </div>

        <div className="bm-legacy-layout">

          <Reveal>
            <div className="bm-legacy-big">
              <span>MORE</span>
              <strong>
                THAN
                <br />
                A COMPANY.
              </strong>
            </div>
          </Reveal>

          <Reveal>
            <div className="bm-legacy-copy">

              <p className="bm-legacy-lead">
                Blue Marine is a journey born from a dream,
                strengthened by struggle, shaped by people
                who believed, and carried forward as a
                promise.
              </p>

              <p>
                The company stands dedicated to the honour,
                memory and principles of Mr. Brijesh Rathore,
                the elder brother of founder Sanjay Rathore
                and a major source of support in his journey.
              </p>

              <div className="bm-legacy-signature">
                <span>THE FOUNDATION</span>
                <strong>
                  BELIEF · PEOPLE · PURPOSE
                </strong>
              </div>

            </div>
          </Reveal>

        </div>

      </section>


      {/* =====================================================
          FUTURE
      ===================================================== */}

      <section className="bm-about-future">

        <div className="bm-future-lines" />

        <div className="bm-about-section-meta bm-light-meta">
          <span>08 / THE FUTURE</span>
          <span>THE NEXT CHAPTER</span>
        </div>

        <div className="bm-future-main">

          <Reveal>
            <span className="bm-small-label">
              THE NEXT ERA OF MEDIA
            </span>
          </Reveal>

          <Reveal>
            <h2>
              THE
              <br />
              <em>FUTURE</em>
              <br />
              IS SOMETHING
              <br />
              WE CREATE.
            </h2>
          </Reveal>

          <Reveal>
            <p>
              As media changes through artificial
              intelligence, immersive experiences,
              short-form storytelling, creator-led
              communication and digital-first brands,
              Blue Marine aims to participate in shaping
              that change.
            </p>
          </Reveal>

        </div>

        <motion.div
          className="bm-future-ring"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bm-about-final">

        <Reveal>
          <span className="bm-small-label">
            LET'S CREATE SOMETHING WORTH REMEMBERING.
          </span>
        </Reveal>

        <Reveal>
          <h2>
            HAVE A STORY
            <br />
            TO <em>TELL?</em>
          </h2>
        </Reveal>

        <Reveal>
          <p>
            A company to introduce?
            <br />
            A product to launch?
            <br />
            A vision to communicate?
          </p>
        </Reveal>

        <Link
          to="/contact"
          className="bm-about-cta"
        >
          START YOUR PROJECT
          <span>↗</span>
        </Link>

      </section>

    </main>
  );
}