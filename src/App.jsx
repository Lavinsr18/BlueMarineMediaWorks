import { Routes, Route, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";
import { services } from "./data";

function ServicePage(){
  const { slug } = useParams();
  const map={"film-video":"01","advertising":"02","media-digital":"03","web-development":"04"};
  const service=services.find(s=>s.no===map[slug]) || services[0];
  return <><section className="mag-inner-hero service-top"><div className="container-wide"><span>{service.no} / BMM SERVICE</span><div className="inner-grid"><h1>{service.title.toUpperCase()}</h1><p>{service.description}</p></div><div className="hero-note">BLUE MARINE MEDIAWORKS · {service.title}</div></div></section><section className="service-detail"><div className="container-wide service-detail-grid"><div className="service-detail-image"><img src={service.image} alt={service.title}/></div><div><span>WHAT WE CREATE</span><h2>Built around your <em>story.</em></h2><p>{service.description} Our team combines creative thinking, production craft and digital execution to build work that travels across platforms.</p><div className="service-bullets"><span>01 · Strategy</span><span>02 · Creative Direction</span><span>03 · Production / Build</span><span>04 · Delivery</span></div></div></div></section></>;
}

export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/journal" element={<Journal/>}/><Route path="/contact" element={<Contact/>}/><Route path="/services/:slug" element={<ServicePage/>}/></Routes></Layout>}
