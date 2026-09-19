"use client";

import { FormEvent, useEffect, useState } from "react";

const projects = [
  {
    title: "NoCap AI",
    label: "AI fact-checking platform",
    stack: ["React", "Tailwind CSS", "FastAPI", "Supabase", "Gemini API"],
    fullStack: "React, React Router, Tailwind CSS, Node.js, Express, Python, FastAPI, Clerk, Supabase, Google Gemini API, custom heuristic analysis, Google Fact Check Tools API, Netlify, and Render.",
    preview: "ai",
    image: "/Screenshot 2026-09-19 170242.png",
    liveUrl: "https://nocap-ai.netlify.app/",
    githubUrl: "https://github.com/jabowambere/nocap-ai",
  },
  {
    title: "Intare Pharmacy",
    label: "Pharmacy inventory system",
    stack: ["React", "Express", "MongoDB", "JWT"],
    fullStack: "React, React Router, custom CSS, Lucide React, JavaScript, Fetch API, Node.js, Express, JWT, MongoDB Atlas, Mongoose, role-based authorization, Nodemon, dotenv, Git, GitHub, Postman, Netlify, and Render or Vercel.",
    preview: "pharmacy",
    image: "/Screenshot 2026-09-19 170327.png",
    liveUrl: "https://intarepharmacy02.netlify.app/",
    githubUrl: "https://github.com/jabowambere/intarepharmacy-v3",
  },
  {
    title: "Bazaar",
    label: "Full MERN stack application",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    fullStack: "React, Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcrypt, Socket.io, socket.io-client, Render, Vercel or Netlify, Git, GitHub, Postman, HTML, CSS, JavaScript, and localStorage.",
    preview: "bazaar",
    image: "/Screenshot 2026-09-19 170356.png",
    liveUrl: "https://bazaar01.netlify.app/",
    githubUrl: "https://github.com/jabowambere/bazaar",
  },
];
const skills = [["JavaScript", "</>"], ["React", "R"], ["Tailwind CSS", "~"], ["MongoDB", "DB"]];

function Avatar() {
  return <svg viewBox="0 0 48 48" className="profile-icon" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#303030" /><circle cx="24" cy="18" r="8" fill="#050505" /><path d="M10 40c2.8-7 8.2-10.5 14-10.5S35.2 33 38 40" fill="#050505" /></svg>;
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setContactOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const openContact = () => { setSent(false); setContactOpen(true); };
  const submitContact = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return <main className="folio-shell">
    <div className="folio-content">
      <section className="intro" id="home" aria-labelledby="name"><Avatar /><h1 id="name">Junior JABO</h1><p>Tech-driven full-stack developer passionate about clean design and crafting scalable web experiences. Adept in both front-end and back-end, always exploring the latest in modern development.</p></section>
      <div className="portfolio-menu"><button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="portfolio-navigation" aria-label="Open portfolio navigation"><span /><span /><span /></button>{menuOpen && <nav id="portfolio-navigation" className="menu-popover" aria-label="Portfolio navigation"><a href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>}</div>
      <section className="project-grid" id="projects" aria-label="Selected projects">{projects.map((project) => <article className="project" key={project.title}><a className="project-image" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live site`}><img className="project-shot" src={project.image} alt="" /><span className="project-arrow" aria-hidden="true">&#8599;</span></a><div className="project-details"><div><h2>{project.title}</h2><p>{project.label}</p>{project.stack.length > 0 && <p className="project-stack" title={project.fullStack}>{project.stack.join("  ·  ")}</p>}</div><a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-github" aria-label={`View ${project.title} on GitHub`}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.56.1.76-.24.76-.53v-2.05c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.12.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.11-.29-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.07-1.15 3.07-1.15.62 1.54.23 2.67.12 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.05c0 .3.2.64.76.53A11.3 11.3 0 0 0 12 .7Z" /></svg></a></div></article>)}</section>
      <section className="skills" id="skills" aria-label="Skills">{skills.map(([name, icon]) => <div className="skill" key={name}><span className="skill-icon" aria-hidden="true">{icon}</span><h2>{name}</h2></div>)}</section>
      <section className="about" id="about" aria-labelledby="about-heading"><h2 id="about-heading">About Me</h2><p>I&apos;m Junior JABO, a full-stack developer focused on building impactful digital solutions. Leveraging the latest tech stacks and clean, tech-inspired designs, I bring a professional touch to every project while keeping the experience fresh and innovative.</p></section>
      <section className="contact" id="contact" aria-labelledby="contact-heading"><div><h2 id="contact-heading">Let&apos;s collaborate!</h2><p>Ready to start a project or want to see more of my work? Reach out today.</p><button className="contact-trigger" onClick={openContact}>Get in Touch</button></div></section>
    </div>
    {contactOpen && <div className="contact-modal-backdrop" role="presentation" onMouseDown={() => setContactOpen(false)}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setContactOpen(false)} aria-label="Close contact form">&times;</button>{sent ? <div className="form-success"><span aria-hidden="true">OK</span><h2>Message ready to send!</h2><p>Thank you for reaching out. I&apos;ll get back to you as soon as I can.</p><button onClick={() => setContactOpen(false)}>Done</button></div> : <><p className="form-kicker">Start a conversation</p><h2 id="form-title">Let&apos;s make something great.</h2><p className="form-intro">Tell me a little about your project, idea, or opportunity.</p><form onSubmit={submitContact}><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" placeholder="Jane Doe" required autoFocus /><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="jane@example.com" required /><label htmlFor="contact-message">How can I help?</label><textarea id="contact-message" name="message" placeholder="I'd love to talk about..." required rows={4} /><button type="submit" className="form-submit">Send message <span aria-hidden="true">&nearr;</span></button></form></>}</section></div>}
  </main>;
}
