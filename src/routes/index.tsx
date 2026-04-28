import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type HTMLMotionProps, type Transition } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Binary,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "N Sumanth Kamath — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of N Sumanth Kamath, a Computer Science Engineering student specializing in full-stack development, blockchain security, and AI.",
      },
      { property: "og:title", content: "N Sumanth Kamath — Full Stack Developer" },
      {
        property: "og:description",
        content: "Full-stack, blockchain, and AI portfolio built to impress recruiters and startups.",
      },
    ],
  }),
  component: Index,
});

const roles = ["Full Stack Developer", "Blockchain Enthusiast", "AI Explorer"];

const navItems = ["About", "Skills", "Projects", "Education", "Contact"];

const highlights = [
  {
    title: "Full Stack Development",
    text: "Building polished products from responsive interfaces to scalable APIs and dashboards.",
    icon: Code2,
  },
  {
    title: "Blockchain Security",
    text: "Designing secure data-sharing flows with smart contracts, hashing, encryption, and IPFS.",
    icon: ShieldCheck,
  },
  {
    title: "AI & Emerging Tech",
    text: "Exploring intelligent UX, automation, and future-facing systems that solve real problems.",
    icon: BrainCircuit,
  },
];

const skillGroups = [
  { label: "Languages", skills: ["C", "C++", "Python", "Java", "SQL"] },
  { label: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind"] },
  { label: "Backend", skills: ["Node.js", "Express.js"] },
  { label: "Database", skills: ["MongoDB", "MySQL"] },
  { label: "Tools", skills: ["VS Code", "Postman", "Jira"] },
];

const projects = [
  {
    title: "Genomic Data Access Control System",
    stack: ["Blockchain", "IPFS", "Firebase", "AES-256", "SHA-256"],
    description:
      "A secure genomic data-sharing system using smart contracts, distributed storage, encryption, and hashing to protect access control workflows.",
    featured: true,
  },
  {
    title: "AI Animated E-Commerce Platform",
    stack: ["Next.js", "Node.js", "MongoDB", "Cloudinary", "Framer Motion"],
    description:
      "A modern e-commerce experience with AI-inspired interactions, animated product discovery, media handling, and full-stack commerce flows.",
  },
  {
    title: "Travelopedia",
    stack: ["React", "Python", "Authentication", "Dashboard"],
    description:
      "A full-stack travel platform with authenticated user journeys, destination management, and a streamlined dashboard experience.",
  },
  {
    title: "Weather Forecast Web App",
    stack: ["JavaScript", "API", "Responsive UI"],
    description:
      "A fast weather application with clean forecasts, location-based lookups, and mobile-first presentation.",
  },
  {
    title: "Student Grade Calculator",
    stack: ["C", "Algorithms", "CLI"],
    description:
      "A C-based grade calculator focused on structured input handling, accurate computation, and beginner-friendly logic design.",
  },
];

const timeline = [
  { title: "BE Computer Science Engineering", detail: "CGPA 9.15", icon: GraduationCap },
  { title: "PU Education", detail: "Strong academic performance with science and computing foundation.", icon: Award },
  { title: "School", detail: "Built early discipline in analytical thinking and problem solving.", icon: CheckCircle2 },
];

const achievements = ["Smart India Hackathon participant", "Forge Quest event"];
const certifications = ["UiPath RPA", "AI Search Methods", "Python course"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const smoothTransition: Transition = { duration: 0.65, ease: "easeOut" };

function Index() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; message?: string }>({});
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, shouldReduceMotion ? 0 : -90]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const onMove = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const role = roles[roleIndex % roles.length];
    let nextTimer: number;
    if (typedRole.length < role.length) {
      nextTimer = window.setTimeout(() => setTypedRole(role.slice(0, typedRole.length + 1)), 72);
    } else {
      nextTimer = window.setTimeout(() => {
        setTypedRole("");
        setRoleIndex((current) => current + 1);
      }, 1450);
    }
    return () => window.clearTimeout(nextTimer);
  }, [roleIndex, typedRole]);

  const sectionAnimation = useMemo(
    () => ({
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-90px" },
      variants: fadeUp,
      transition: smoothTransition,
    }),
    [],
  );

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const errors: { email?: string; message?: string } = {};

    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
    if (message.length < 12) errors.message = "Message should be at least 12 characters.";
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      const subject = encodeURIComponent("Portfolio inquiry for N Sumanth Kamath");
      const body = encodeURIComponent(message);
      window.location.href = `mailto:nsumanthkamath@example.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <main className={lightMode ? "bg-foreground text-background" : "bg-background text-foreground"}>
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-neon-cyan via-primary to-accent" style={{ scaleX: progress }} />

      {!loaded && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="glass-panel flex items-center gap-3 rounded-2xl px-6 py-4 font-display text-sm tracking-[0.24em] text-muted-foreground"
            animate={{ scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Sparkles className="size-5 text-neon-cyan" /> LAUNCHING PORTFOLIO
          </motion.div>
        </motion.div>
      )}

      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none fixed z-[70] hidden h-36 w-36 rounded-full bg-primary/20 blur-3xl md:block"
          animate={{ x: cursor.x - 72, y: cursor.y - 72 }}
          transition={{ type: "spring", stiffness: 260, damping: 34 }}
        />
      )}

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} lightMode={lightMode} setLightMode={setLightMode} />

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 sm:px-8 lg:px-12">
        <div className="grid-glow absolute inset-0 opacity-80" />
        <motion.div
          className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full bg-primary/25 blur-3xl"
          animate={shouldReduceMotion ? {} : { y: [0, -24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[16%] right-[8%] h-52 w-52 rounded-full bg-accent/25 blur-3xl"
          animate={shouldReduceMotion ? {} : { y: [0, 22, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div {...sectionAnimation} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-glass px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl">
              <Zap className="size-4 text-neon-cyan" /> Computer Science Engineering Student
            </div>
            <div className="space-y-5">
              <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-normal text-balance sm:text-7xl lg:text-8xl">
                N Sumanth <span className="neon-text">Kamath</span>
              </h1>
              <p className="max-w-2xl text-xl font-medium text-muted-foreground sm:text-2xl">
                Full Stack Developer | Blockchain Enthusiast | AI Explorer
              </p>
              <div className="h-9 font-display text-2xl font-semibold text-neon-cyan sm:text-3xl">
                {typedRole}<span className="text-accent">|</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="neon" size="lg" asChild>
                <a href="#projects"><Rocket className="size-4" /> View Projects</a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="/resume.pdf" download><Download className="size-4" /> Download Resume</a>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <SocialIcon label="GitHub" icon={<Github />} href="https://github.com/" />
              <SocialIcon label="LinkedIn" icon={<Linkedin />} href="https://linkedin.com/" />
              <a className="story-link text-sm text-muted-foreground" href="#contact">Available for internships and roles</a>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel neon-border relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[2rem] p-6"
            initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--neon-cyan),transparent_28%),radial-gradient(circle_at_70%_75%,var(--neon-purple),transparent_30%)] opacity-20" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-border bg-background/45 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex gap-2"><span className="size-3 rounded-full bg-destructive" /><span className="size-3 rounded-full bg-chart-5" /><span className="size-3 rounded-full bg-chart-4" /></div>
                <Binary className="text-neon-cyan" />
              </div>
              <div className="space-y-4 font-mono text-sm text-muted-foreground">
                <p><span className="text-neon-purple">const</span> developer = &#123;</p>
                <p className="pl-5">name: <span className="text-foreground">"N Sumanth Kamath"</span>,</p>
                <p className="pl-5">focus: [<span className="text-neon-cyan">"web"</span>, <span className="text-neon-cyan">"blockchain"</span>, <span className="text-neon-cyan">"AI"</span>],</p>
                <p className="pl-5">mindset: <span className="text-foreground">"ship secure, elegant systems"</span></p>
                <p>&#125;;</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["9.15", "5+", "3"].map((value, index) => (
                  <div key={value} className="rounded-2xl border border-border bg-glass p-4 text-center">
                    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{["CGPA", "Projects", "Domains"][index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        <a href="#about" className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-glass p-3 backdrop-blur-xl transition-transform hover:translate-y-1" aria-label="Scroll to about">
          <ArrowDown className="size-5" />
        </a>
      </section>

      <Section id="about" eyebrow="About" title="Problem-solving mindset. Product-grade execution." {...sectionAnimation}>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-3xl p-7 text-lg leading-8 text-muted-foreground">
            I’m a Computer Science Engineering student who enjoys turning complex ideas into secure, usable products. My work blends clean UI engineering, backend architecture, blockchain security patterns, and curiosity for AI-powered experiences.
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <motion.div key={item.title} className="glass-panel rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-2" variants={fadeUp} transition={{ delay: index * 0.08 }}>
                <item.icon className="mb-5 size-8 text-neon-cyan" />
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="A practical stack for shipping end-to-end systems." {...sectionAnimation}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((group, index) => (
            <motion.div key={group.label} className="glass-panel rounded-3xl p-5" variants={fadeUp} transition={{ delay: index * 0.06 }}>
              <h3 className="mb-4 font-display text-lg font-semibold text-neon-cyan">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => <span key={skill} className="rounded-full border border-border bg-glass px-3 py-2 text-sm text-foreground shadow-card transition hover:-translate-y-0.5 hover:border-primary">{skill}</span>)}
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-primary to-accent" initial={{ width: 0 }} whileInView={{ width: `${76 + index * 4}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Projects" title="Security-minded, animated, full-stack project work." {...sectionAnimation}>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.button key={project.title} onClick={() => setActiveProject(project)} className={`glass-panel group rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary ${project.featured ? "lg:col-span-2" : ""}`} variants={fadeUp} transition={{ delay: index * 0.06 }}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-neon-cyan">Project {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
                </div>
                <ArrowUpRight className="size-6 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-neon-cyan" />
              </div>
              <p className="max-w-3xl leading-7 text-muted-foreground">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => <span key={tech} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">{tech}</span>)}
              </div>
              <div className="mt-7 flex gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Github className="size-4" /> GitHub</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-glass px-4 py-2 text-sm font-semibold text-foreground"><ExternalLink className="size-4" /> Live demo</span>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Experience / Education" title="Academic discipline with event-driven growth." {...sectionAnimation}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative space-y-5 before:absolute before:left-6 before:top-8 before:h-[calc(100%-4rem)] before:w-px before:bg-border">
            {timeline.map((item, index) => (
              <motion.div key={item.title} className="glass-panel relative ml-0 rounded-3xl p-6 pl-20" variants={fadeUp} transition={{ delay: index * 0.08 }}>
                <div className="absolute left-5 top-6 z-10 rounded-2xl border border-border bg-background p-3 text-neon-cyan"><item.icon className="size-6" /></div>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-5">
            <InfoList title="Achievements" icon={<Award />} items={achievements} />
            <InfoList title="Certifications" icon={<BriefcaseBusiness />} items={certifications} />
          </div>
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let’s build something secure, fast, and memorable." {...sectionAnimation}>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel rounded-3xl p-7">
            <Mail className="mb-5 size-9 text-neon-cyan" />
            <h3 className="font-display text-2xl font-semibold">Open to opportunities</h3>
            <p className="mt-4 leading-7 text-muted-foreground">Reach out for internships, full-stack roles, blockchain ideas, or collaboration on AI-enabled products.</p>
            <div className="mt-7 space-y-3 text-sm text-muted-foreground">
              <p>nsumanthkamath@example.com</p>
              <div className="flex gap-3"><SocialIcon label="GitHub" icon={<Github />} href="https://github.com/" /><SocialIcon label="LinkedIn" icon={<Linkedin />} href="https://linkedin.com/" /></div>
            </div>
          </div>
          <form onSubmit={handleContact} className="glass-panel rounded-3xl p-6 sm:p-8" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">Name<input name="name" className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground outline-none transition focus:border-primary" placeholder="Your name" /></label>
              <label className="space-y-2 text-sm font-semibold">Email<input name="email" className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground outline-none transition focus:border-primary" placeholder="you@example.com" /></label>
            </div>
            {fieldErrors.email && <p className="mt-2 text-sm text-destructive">{fieldErrors.email}</p>}
            <label className="mt-4 block space-y-2 text-sm font-semibold">Message<textarea name="message" rows={6} className="w-full resize-none rounded-2xl border border-border bg-input px-4 py-3 text-foreground outline-none transition focus:border-primary" placeholder="Tell me about the role or project..." /></label>
            {fieldErrors.message && <p className="mt-2 text-sm text-destructive">{fieldErrors.message}</p>}
            <Button className="mt-5 w-full" variant="neon" size="lg"><Send className="size-4" /> Send Message</Button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">© 2026 N Sumanth Kamath. Built with precision, motion, and secure engineering.</footer>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </main>
  );
}

function Navbar({ menuOpen, setMenuOpen, lightMode, setLightMode }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void; lightMode: boolean; setLightMode: (value: boolean) => void }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border bg-background/55 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#home" className="font-display text-lg font-bold tracking-normal">NSK<span className="text-neon-cyan">.</span></a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase().replace(" / ", "-")}`} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">{item}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLightMode(!lightMode)} className="rounded-full border border-border bg-glass p-2 text-foreground transition hover:-translate-y-0.5" aria-label="Toggle theme">{lightMode ? <Moon className="size-4" /> : <Sun className="size-4" />}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-border bg-glass p-2 md:hidden" aria-label="Toggle menu">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </nav>
      {menuOpen && <div className="mx-auto mt-4 grid max-w-7xl gap-2 md:hidden">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase().replace(" / ", "-")}`} onClick={() => setMenuOpen(false)} className="rounded-2xl border border-border bg-glass px-4 py-3 text-sm text-muted-foreground">{item}</a>)}</div>}
    </header>
  );
}

function Section({ id, eyebrow, title, children, ...motionProps }: { id: string; eyebrow: string; title: string; children: ReactNode } & HTMLMotionProps<"section">) {
  return (
    <motion.section id={id} className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" {...motionProps}>
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-neon-cyan">{eyebrow}</p>
        <h2 className="font-display text-4xl font-bold tracking-normal text-balance sm:text-5xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function SocialIcon({ label, icon, href }: { label: string; icon: ReactNode; href: string }) {
  return <a aria-label={label} href={href} className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-glass text-foreground backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary hover:text-neon-cyan">{icon}</a>;
}

function InfoList({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="mb-5 flex items-center gap-3 font-display text-xl font-semibold text-foreground"><span className="text-neon-cyan">{icon}</span>{title}</div>
      <div className="space-y-3">{items.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-glass px-4 py-3 text-muted-foreground"><ChevronRight className="size-4 text-neon-cyan" />{item}</div>)}</div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[75] flex items-center justify-center bg-background/75 p-5 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <motion.div className="glass-panel max-w-2xl rounded-3xl p-7" initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-5">
          <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.24em] text-neon-cyan">Project detail</p><h3 className="font-display text-3xl font-bold">{project.title}</h3></div>
          <button onClick={onClose} className="rounded-full border border-border bg-glass p-2"><X className="size-5" /></button>
        </div>
        <p className="leading-8 text-muted-foreground">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">{tech}</span>)}</div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button variant="neon" asChild><a href="https://github.com/"><Github className="size-4" /> Open GitHub</a></Button><Button variant="glass" asChild><a href="#projects"><Blocks className="size-4" /> View case study</a></Button></div>
      </motion.div>
    </motion.div>
  );
}
