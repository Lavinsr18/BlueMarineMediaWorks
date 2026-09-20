import { motion } from "framer-motion";
export default function Marquee({ items, reverse=false }) {
  const row=[...items,...items];
  return <div className="marquee-wrap"><motion.div className="marquee-track" animate={{ x: reverse ? ["-50%","0%"] : ["0%","-50%"] }} transition={{ duration:28, repeat:Infinity, ease:"linear" }}>{row.map((x,i)=><span key={i}>{x}<b>✦</b></span>)}</motion.div></div>;
}
