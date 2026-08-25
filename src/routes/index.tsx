import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
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
  Layers,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Card3D, Layer3D } from "@/components/Card3D";
import { Hero3DConsole } from "@/components/Hero3DConsole";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "N Sumanth Kamath — Full Stack & Blockchain Developer" },
      {
        name: "description",
        content:
          "Portfolio of N Sumanth Kamath, a Computer Science Engineering student specializing in full-stack web development, blockchain security, and AI applications.",
      },
      { property: "og:title", content: "N Sumanth Kamath — Full Stack Developer" },
      {
        property: "og:description",
        content: "Full-stack, blockchain, and AI portfolio of N Sumanth Kamath.",
      },
    ],
  }),
  component: Index,
});

const roles = [
  "Full Stack Developer",
  "Blockchain Builder",
  "AI Systems Explorer",
  "Computer Science Engineer",
];

const navItems = ["About", "Skills", "Projects", "Education", "Contact"];

const highlights = [
  {
    title: "Full Stack Development",
    text: "Building responsive, modern user interfaces connected to scalable Node.js/Express APIs and structured databases.",
    icon: Code2,
    gradient: "from-sky-500/20 to-blue-600/10",
    accent: "text-sky-400",
  },
  {
    title: "Blockchain & Security",
    text: "Implementing decentralized access control, smart contracts, cryptographic data integrity, and distributed IPFS storage.",
    icon: ShieldCheck,
    gradient: "from-purple-500/20 to-indigo-600/10",
    accent: "text-purple-400",
  },
  {
    title: "AI & Emerging Tech",
    text: "Exploring practical automation, intelligent application workflows, and modern algorithmic problem solving.",
    icon: BrainCircuit,
    gradient: "from-pink-500/20 to-rose-600/10",
    accent: "text-pink-400",
  },
];

const skillCategories = [
  {
    label: "Languages",
    skills: ["C", "C++", "Python", "Java", "SQL", "JavaScript", "TypeScript"],
    icon: Terminal,
    color: "text-sky-400",
  },
  {
    label: "Frontend",
    skills: ["React 19", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Framer Motion"],
    icon: Layers,
    color: "text-cyan-400",
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Middleware"],
    icon: Code2,
    color: "text-purple-400",
  },
  {
    label: "Databases & Storage",
    skills: ["MongoDB", "MySQL", "Firebase", "IPFS Distributed Storage"],
    icon: Database,
    color: "text-emerald-400",
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Jira", "Linux"],
    icon: Sparkles,
    color: "text-amber-400",
  },
];

const projects = [
  {
    title: "Genomic Data Access Control System",
    stack: ["Blockchain", "Smart Contracts", "IPFS", "Firebase", "AES-256", "SHA-256"],
    description:
      "A decentralized access control system for genomic records. Uses smart contracts to enforce fine-grained permissions, IPFS for distributed encrypted file storage, and AES-256/SHA-256 for data privacy and tamper resistance.",
    featured: true,
    category: "Blockchain & Security",
    metrics: "Decentralized • Cryptographically Encrypted",
  },
  {
    title: "AI Animated E-Commerce Platform",
    stack: ["Next.js", "Node.js", "MongoDB", "Cloudinary", "Framer Motion"],
    description:
      "A full-stack e-commerce web platform featuring smooth animated product interactions, AI-driven discovery flows, Cloudinary media management, and end-to-end cart & checkout flows.",
    category: "Full Stack Web",
    metrics: "60 FPS Micro-Interactions • Cloud Native",
  },
  {
    title: "Travelopedia",
    stack: ["React", "Python", "Authentication", "Dashboard", "REST API"],
    description:
      "A complete travel exploration and booking portal featuring user authentication, personalized destination bookmarks, and a responsive administrative dashboard.",
    category: "Web Application",
    metrics: "Secure Auth • Dynamic Dashboard",
  },
  {
    title: "Weather Forecast Web App",
    stack: ["JavaScript", "OpenWeather API", "Responsive UI", "GeoLocation"],
    description:
      "A lightweight, fast weather forecasting application delivering live weather data, temperature forecasts, and location-based search.",
    category: "Frontend Web",
    metrics: "Real-Time API • Mobile First",
  },
  {
    title: "Student Grade Calculator",
    stack: ["C Language", "Data Structures", "Algorithms", "CLI"],
    description:
      "A structured C program designed to compute student GPAs, evaluate subject-wise weightages, and provide accurate performance analytics.",
    category: "Systems & Algorithms",
    metrics: "Structured I/O • Accurate Analytics",
  },
];

const timeline = [
  {
    title: "B.E. Computer Science & Engineering",
    detail: "CGPA 9.15 — In-depth academic grounding in Data Structures, Algorithms, Operating Systems, Database Management, and Blockchain Security.",
    icon: GraduationCap,
    badge: "CGPA: 9.15",
  },
  {
    title: "Pre-University Education (12th Grade)",
    detail: "Focused science and computing curriculum with strong foundation in mathematics and analytical problem solving.",
    icon: Award,
    badge: "Distinction",
  },
  {
    title: "Secondary School (10th Grade)",
    detail: "Strong foundational academic track record with active interest in competitive mathematics and science.",
    icon: CheckCircle2,
    badge: "Excellence",
  },
];

const achievements = [
  "Smart India Hackathon (SIH) Participant — Built secure distributed data pipeline for real-world challenge",
  "Forge Quest Innovation Challenge — Recognized for creative technical implementation",
  "Consistent Academic Top Performer in Computer Science Engineering (CGPA 9.15)",
];

const certifications = [
  "UiPath RPA Developer Foundation — Process Automation & Workflow Engineering",
  "AI Search Methods & Problem Solving — Heuristics & Algorithm Optimization",
  "Python Programming & Data Structures — Object-Oriented Design & Backend Logic",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const smoothTransition: Transition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] };

function Index() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, shouldReduceMotion ? 0 : -60]);

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
      nextTimer = window.setTimeout(() => setTypedRole(role.slice(0, typedRole.length + 1)), 60);
    } else {
      nextTimer = window.setTimeout(() => {
        setTypedRole("");
        setRoleIndex((current) => current + 1);
      }, 1500);
    }
    return () => window.clearTimeout(nextTimer);
  }, [roleIndex, typedRole]);

  const sectionAnimation = useMemo(
    () => ({
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-60px" },
      variants: fadeUp,
      transition: smoothTransition,
    }),
    [],
  );

  const handleContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!name) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (message.length < 10) errors.message = "Message must be at least 10 characters.";
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormStatus("idle");
      try {
        formData.append("access_key", "75b32957-fa97-42fe-976b-8c311d77fa09");
        formData.append("from_name", `Portfolio Visitor - ${name}`);
        formData.append("subject", `New Portfolio Inquiry from ${name}`);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          setFormStatus("success");
          setStatusMsg("Thank you! Your message has been delivered directly to Sumanth's Gmail inbox.");
          form.reset();
        } else {
          setFormStatus("error");
          setStatusMsg(result.message || "Could not send message. Please try again or email directly.");
        }
      } catch (err) {
        setFormStatus("error");
        setStatusMsg("Network error. Please try again or email sumanthkamath665@gmail.com directly.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main
      className={`relative min-h-screen selection:bg-neon-cyan/30 selection:text-white ${
        lightMode ? "bg-foreground text-background" : "bg-background text-foreground"
      }`}
    >
      {/* 3D WebGL Background Scene */}
      <ThreeCanvas interactive={!shouldReduceMotion} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-neon-cyan via-primary to-accent shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        style={{ scaleX: progress }}
      />

      {/* Ambient Cursor Glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none fixed z-[60] hidden h-44 w-44 rounded-full bg-gradient-to-tr from-neon-cyan/15 via-primary/20 to-accent/15 blur-3xl md:block"
          animate={{ x: cursor.x - 88, y: cursor.y - 88 }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
        />
      )}

      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8 lg:px-12"
      >
        {/* Subtle Cyber Grid */}
        <div className="grid-glow absolute inset-0 opacity-70 pointer-events-none" />

        {/* Ambient Glows */}
        <motion.div
          className="absolute left-[8%] top-[18%] h-60 w-60 rounded-full bg-primary/20 blur-[100px] pointer-events-none"
          animate={shouldReduceMotion ? {} : { y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[14%] right-[8%] h-72 w-72 rounded-full bg-accent/20 blur-[110px] pointer-events-none"
          animate={shouldReduceMotion ? {} : { y: [0, 22, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          {/* Hero Content Left */}
          <motion.div {...sectionAnimation} className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-xl">
              <Zap className="size-3.5 text-neon-cyan" />
              <span>Computer Science Engineering • CGPA 9.15</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-8xl">
                N Sumanth <br />
                <span className="neon-text">Kamath</span>
              </h1>
              <p className="max-w-xl text-lg font-medium text-muted-foreground sm:text-2xl">
                Full Stack Developer specializing in modern web applications, blockchain security, and AI systems.
              </p>
              <div className="flex items-center gap-2 h-9 font-display text-2xl font-bold text-neon-cyan sm:text-3xl">
                <span>{typedRole}</span>
                <span className="animate-pulse text-accent">|</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="neon"
                size="lg"
                className="group rounded-2xl px-7 py-6 text-base font-bold shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]"
                asChild
              >
                <a href="#projects">
                  <Rocket className="size-5 transition-transform group-hover:rotate-12" />
                  <span>View Projects</span>
                </a>
              </Button>

              <Button
                variant="glass"
                size="lg"
                className="rounded-2xl border-white/20 bg-white/5 px-7 py-6 text-base font-semibold backdrop-blur-xl transition hover:bg-white/10"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="size-5" />
                  <span>Download Resume</span>
                </a>
              </Button>
            </div>

            {/* Social Links & Status */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <SocialIcon label="GitHub" icon={<Github />} href="https://github.com/Sumanthk-17" />
              <SocialIcon label="LinkedIn" icon={<Linkedin />} href="https://linkedin.com/" />
              <div className="h-6 w-px bg-border" />
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-neon-cyan"
                href="#contact"
              >
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Internships & Opportunities</span>
              </a>
            </div>
          </motion.div>

          {/* Hero 3D Interactive Console Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero3DConsole />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground transition hover:text-neon-cyan hover:translate-y-1"
          aria-label="Scroll to about"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">SCROLL</span>
          <div className="rounded-full border border-white/20 bg-white/5 p-2 backdrop-blur-xl">
            <ArrowDown className="size-4 animate-bounce" />
          </div>
        </a>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <Section
        id="about"
        eyebrow="Background & Overview"
        title="Solid computer science fundamentals. Hands-on full stack execution."
        {...sectionAnimation}
      >
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Main Bio Card */}
          <Card3D maxTilt={10} glareOpacity={0.2}>
            <div className="glass-card-3d relative flex h-full flex-col justify-between rounded-[2rem] p-8">
              <Layer3D z={20}>
                <div className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 px-3 py-1 text-xs font-semibold text-neon-cyan mb-4">
                  <Sparkles className="size-3.5" />
                  <span>About Sumanth</span>
                </div>
                <h3 className="font-display text-2xl font-bold leading-snug">
                  Building dependable, scalable software with modern web and blockchain technologies.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  I am a Computer Science Engineering student passionate about end-to-end software development. I enjoy taking ideas from system design and API architecture to fluid user interfaces and secure decentralized workflows.
                </p>
              </Layer3D>

              <Layer3D z={25}>
                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="font-display text-3xl font-extrabold text-neon-cyan">9.15</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">B.E. CSE CGPA</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="font-display text-3xl font-extrabold text-accent">5+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Built Projects</p>
                  </div>
                </div>
              </Layer3D>
            </div>
          </Card3D>

          {/* 3 Domain Pillar Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card3D key={item.title} maxTilt={12} glareOpacity={0.25}>
                  <div className="glass-card-3d relative flex h-full flex-col justify-between rounded-[2rem] p-6">
                    <Layer3D z={30}>
                      <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/10 p-3.5 shadow-md`}>
                        <Icon className={`size-6 ${item.accent}`} />
                      </div>
                      <h4 className="font-display text-lg font-bold">{item.title}</h4>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </Layer3D>

                    <Layer3D z={20}>
                      <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-neon-cyan/80">
                        <span>Domain {index + 1}</span>
                        <ChevronRight className="size-3.5" />
                      </div>
                    </Layer3D>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ================= SKILLS SECTION ================= */}
      <Section
        id="skills"
        eyebrow="Skills & Technologies"
        title="Core technical competencies across frontend, backend, and tools."
        {...sectionAnimation}
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {skillCategories.map((group) => {
            const Icon = group.icon;
            return (
              <Card3D key={group.label} maxTilt={10} glareOpacity={0.2}>
                <div className="glass-card-3d flex h-full flex-col justify-between rounded-[2rem] p-6">
                  <Layer3D z={25}>
                    <div className="mb-5 flex items-center gap-2.5">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-neon-cyan">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        {group.label}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-neon-cyan hover:bg-neon-cyan/10 hover:text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Layer3D>
                </div>
              </Card3D>
            );
          })}
        </div>
      </Section>

      {/* ================= PROJECTS SECTION ================= */}
      <Section
        id="projects"
        eyebrow="Featured Projects"
        title="Practical applications in blockchain security, web platforms, and systems."
        {...sectionAnimation}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card3D
              key={project.title}
              maxTilt={10}
              glareOpacity={0.25}
              onClick={() => setActiveProject(project)}
              className={project.featured ? "lg:col-span-2 cursor-pointer" : "cursor-pointer"}
            >
              <div className="glass-card-3d group relative flex h-full flex-col justify-between rounded-[2.2rem] p-7 transition-all duration-300">
                <Layer3D z={30}>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded-md bg-neon-cyan/15 border border-neon-cyan/30 px-2.5 py-0.5 font-mono text-[11px] font-bold text-neon-cyan">
                          PROJECT // {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs text-muted-foreground font-semibold">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-neon-cyan transition-colors sm:text-3xl">
                        {project.title}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-muted-foreground transition duration-300 group-hover:border-neon-cyan group-hover:bg-neon-cyan/20 group-hover:text-white group-hover:scale-110">
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.description}
                  </p>
                </Layer3D>

                <Layer3D z={20}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-foreground/90 backdrop-blur-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <span className="font-mono text-xs text-neon-cyan/80 font-medium">
                      {project.metrics}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground transition group-hover:border-primary group-hover:bg-primary/20">
                        <Github className="size-3.5" />
                        <span>Source</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-neon-cyan to-primary px-3.5 py-1.5 text-xs font-bold text-black shadow-md">
                        <ExternalLink className="size-3.5" />
                        <span>Details</span>
                      </span>
                    </div>
                  </div>
                </Layer3D>
              </div>
            </Card3D>
          ))}
        </div>
      </Section>

      {/* ================= EDUCATION & ACHIEVEMENTS ================= */}
      <Section
        id="education"
        eyebrow="Education & Honors"
        title="Academic performance, hackathons, and certifications."
        {...sectionAnimation}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Timeline */}
          <div className="relative space-y-5 before:absolute before:left-7 before:top-8 before:h-[calc(100%-4rem)] before:w-0.5 before:bg-gradient-to-b before:from-neon-cyan before:via-primary before:to-transparent">
            {timeline.map((item) => {
              const Icon = item.icon;
              return (
                <Card3D key={item.title} maxTilt={8} glareOpacity={0.18}>
                  <div className="glass-card-3d relative rounded-[2rem] p-6 pl-20">
                    <Layer3D z={25}>
                      <div className="absolute left-4 top-6 z-10 flex size-12 items-center justify-center rounded-2xl border border-neon-cyan/40 bg-background/90 text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                        <Icon className="size-6" />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl font-bold">{item.title}</h3>
                        <span className="rounded-full bg-neon-cyan/15 border border-neon-cyan/30 px-3 py-0.5 text-xs font-bold text-neon-cyan">
                          {item.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </Layer3D>
                  </div>
                </Card3D>
              );
            })}
          </div>

          {/* Right Achievements & Certs */}
          <div className="grid gap-5">
            <Card3D maxTilt={8} glareOpacity={0.18}>
              <div className="glass-card-3d rounded-[2rem] p-6">
                <Layer3D z={25}>
                  <div className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-foreground">
                    <div className="rounded-xl bg-amber-400/20 border border-amber-400/30 p-2 text-amber-400">
                      <Award className="size-5" />
                    </div>
                    <span>Honors & Hackathons</span>
                  </div>
                  <div className="space-y-3">
                    {achievements.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-muted-foreground transition hover:border-amber-400/40 hover:bg-white/10"
                      >
                        <ChevronRight className="mt-0.5 size-4 shrink-0 text-amber-400" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </Layer3D>
              </div>
            </Card3D>

            <Card3D maxTilt={8} glareOpacity={0.18}>
              <div className="glass-card-3d rounded-[2rem] p-6">
                <Layer3D z={25}>
                  <div className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-foreground">
                    <div className="rounded-xl bg-neon-cyan/20 border border-neon-cyan/30 p-2 text-neon-cyan">
                      <BriefcaseBusiness className="size-5" />
                    </div>
                    <span>Certifications</span>
                  </div>
                  <div className="space-y-3">
                    {certifications.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-muted-foreground transition hover:border-neon-cyan/40 hover:bg-white/10"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-cyan" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </Layer3D>
              </div>
            </Card3D>
          </div>
        </div>
      </Section>

      {/* ================= CONTACT SECTION ================= */}
      <Section
        id="contact"
        eyebrow="Contact & Collaboration"
        title="Let’s connect for internships, roles, and software projects."
        {...sectionAnimation}
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card3D maxTilt={10} glareOpacity={0.2}>
            <div className="glass-card-3d flex h-full flex-col justify-between rounded-[2.2rem] p-8">
              <Layer3D z={25}>
                <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-primary/20 border border-white/10 p-4 text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                  <Mail className="size-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">Get In Touch</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  I am actively seeking software engineering internships, full-stack roles, and opportunities to collaborate on impactful systems.
                </p>

                <div className="mt-8 space-y-3 text-sm font-medium text-muted-foreground">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-neon-cyan font-mono mb-1">EMAIL INQUIRIES</p>
                    <a
                      href="mailto:sumanthkamath665@gmail.com"
                      className="text-foreground font-semibold hover:text-neon-cyan transition-colors"
                    >
                      sumanthkamath665@gmail.com
                    </a>
                  </div>
                </div>
              </Layer3D>

              <Layer3D z={20}>
                <div className="mt-8 flex gap-3">
                  <SocialIcon label="GitHub" icon={<Github />} href="https://github.com/Sumanthk-17" />
                  <SocialIcon label="LinkedIn" icon={<Linkedin />} href="https://linkedin.com/" />
                </div>
              </Layer3D>
            </div>
          </Card3D>

          <Card3D maxTilt={8} glareOpacity={0.18}>
            <div className="glass-card-3d rounded-[2.2rem] p-7 sm:p-9">
              <Layer3D z={25}>
                <form onSubmit={handleContact} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Name</span>
                      <input
                        name="name"
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-neon-cyan focus:bg-white/10"
                        placeholder="Your full name"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Email Address</span>
                      <input
                        name="email"
                        type="email"
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-neon-cyan focus:bg-white/10"
                        placeholder="you@domain.com"
                      />
                    </label>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>
                    )}
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-rose-400 sm:col-start-2">{fieldErrors.email}</p>
                    )}
                  </div>

                  <label className="mt-5 block space-y-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-neon-cyan focus:bg-white/10"
                      placeholder="Discuss project requirements, internship opportunities, or inquiries..."
                    />
                  </label>
                  {fieldErrors.message && (
                    <p className="mt-2 text-xs text-rose-400">{fieldErrors.message}</p>
                  )}

                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 text-xs font-semibold text-emerald-400"
                    >
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span>{statusMsg}</span>
                    </motion.div>
                  )}

                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2.5 rounded-2xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-xs font-semibold text-rose-400"
                    >
                      <X className="size-4 shrink-0" />
                      <span>{statusMsg}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-2xl py-6 text-base font-bold shadow-[0_0_25px_rgba(99,102,241,0.4)] transition hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] disabled:opacity-60"
                    variant="neon"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="size-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Layer3D>
            </div>
          </Card3D>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-background/80 px-5 py-10 text-center text-xs text-muted-foreground backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl space-y-2">
          <p className="font-display font-bold text-foreground text-sm">
            N Sumanth Kamath • Full Stack & Blockchain Developer
          </p>
          <p>© 2026 Crafted with precision, Three.js, and modern web architecture.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </main>
  );
}

/* ================= NAV COMPONENT ================= */
function Navbar({
  menuOpen,
  setMenuOpen,
  lightMode,
  setLightMode,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  lightMode: boolean;
  setLightMode: (value: boolean) => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-background/60 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          <span className="size-8 rounded-xl bg-gradient-to-tr from-neon-cyan to-primary flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            NK
          </span>
          <span>NSK<span className="text-neon-cyan">.</span></span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" / ", "-")}`}
              className="text-sm font-semibold text-muted-foreground transition hover:text-neon-cyan"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLightMode(!lightMode)}
            className="rounded-full border border-white/15 bg-white/5 p-2.5 text-foreground transition hover:border-white/30 hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {lightMode ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-white/15 bg-white/5 p-2.5 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 grid max-w-7xl gap-2 rounded-2xl border border-white/10 bg-background/95 p-4 backdrop-blur-2xl md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" / ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:text-neon-cyan hover:bg-white/10"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

/* ================= SECTION WRAPPER ================= */
function Section({
  id,
  eyebrow,
  title,
  children,
  ...motionProps
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
} & HTMLMotionProps<"section">) {
  return (
    <motion.section
      id={id}
      className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      {...motionProps}
    >
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan mb-3">
          <span>{eyebrow}</span>
        </div>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

/* ================= SOCIAL ICON ================= */
function SocialIcon({ label, icon, href }: { label: string; icon: ReactNode; href: string }) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-foreground backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-neon-cyan hover:bg-neon-cyan/20 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
    >
      {icon}
    </a>
  );
}

/* ================= PROJECT MODAL ================= */
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-5 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-card-3d relative max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/20 bg-background/95 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
        initial={{ scale: 0.9, y: 25 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <span className="rounded-md bg-neon-cyan/20 border border-neon-cyan/30 px-2.5 py-0.5 font-mono text-xs font-bold text-neon-cyan">
              {project.category}
            </span>
            <h3 className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/10 p-2.5 text-foreground transition hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-6">
          <p className="text-xs font-mono font-bold text-neon-cyan uppercase tracking-wider mb-2">
            TECHNOLOGY STACK
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="neon"
            size="lg"
            className="rounded-2xl py-6 font-bold shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            asChild
          >
            <a href="https://github.com/Sumanthk-17" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              <span>Source Repository</span>
            </a>
          </Button>
          <Button
            variant="glass"
            size="lg"
            className="rounded-2xl border-white/20 bg-white/5 py-6 font-semibold"
            asChild
          >
            <a href="#projects" onClick={onClose}>
              <ExternalLink className="size-4" />
              <span>Back to Projects</span>
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
