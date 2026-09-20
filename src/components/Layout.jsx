import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "../data";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/journal", "Journal"],
];

export default function Layout({ children }) {
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <div className="noise" />
      <div className="top-caption">BLUE MARINE MEDIAWORKS PVT. LTD.</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: .55, ease: [0.22, 1, .36, 1] }}
          className="page-layer"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <motion.nav
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .9, delay: .45, ease: [0.22, 1, .36, 1] }}
        className="mag-nav"
      >
        <Link to="/" className="mini-avatar" aria-label="Blue Marine home">
          <span />
        </Link>
        <div className="nav-links">
          {links.map(([to, label]) => (
            <Link key={to} className={location.pathname === to ? "active" : ""} to={to}>{label}</Link>
          ))}
        </div>
        <Link to="/contact" className="nav-contact">Contact <span>+</span></Link>
      </motion.nav>

      <button className="mobile-trigger" onClick={() => setMenu(v => !v)} aria-label="Toggle menu">
        <span /><span />
      </button>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:-20, opacity:0 }} className="mobile-panel">
            {links.map(([to,label]) => <Link key={to} to={to}>{label}</Link>)}
            <Link to="/contact">Contact <span>+</span></Link>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="site-footer">
        <div>© {new Date().getFullYear()} {brand.legalName}</div>
        <div>Delhi / NCR · India</div>
      </footer>
    </div>
  );
}
