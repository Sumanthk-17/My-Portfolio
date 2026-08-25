import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Layers,
  Server,
  Sparkles,
  Terminal,
  UserCheck,
} from "lucide-react";
import { Card3D, Layer3D } from "./Card3D";

export function Hero3DConsole() {
  const [activeTab, setActiveTab] = useState<"profile" | "stack" | "domains" | "highlights">("profile");

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      {/* Main 3D Console Card */}
      <Card3D maxTilt={10} glareOpacity={0.25}>
        <div className="glass-card-3d relative overflow-hidden rounded-[2.2rem] p-6 sm:p-7">
          {/* Header Bar */}
          <Layer3D z={30}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <span className="size-3 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  <span className="size-3 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                </div>
                <div className="ml-2 flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                  <Terminal className="size-3 text-neon-cyan" />
                  <span>sumanth-kamath.dev</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                <span>Open for Roles</span>
              </div>
            </div>
          </Layer3D>

          {/* Interactive Navigation Tabs */}
          <Layer3D z={35}>
            <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-2xl bg-white/5 p-1 text-xs font-semibold text-muted-foreground backdrop-blur-md">
              {[
                { id: "profile", label: "Profile", icon: Code2 },
                { id: "stack", label: "Stack", icon: Layers },
                { id: "domains", label: "Domains", icon: Cpu },
                { id: "highlights", label: "Honors", icon: Award },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`relative flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all duration-200 ${
                      isActive
                        ? "text-foreground font-bold shadow-sm"
                        : "hover:text-foreground/90 hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeroTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-accent/25 to-neon-cyan/30 border border-white/20 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon className="relative z-10 size-3.5" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </Layer3D>

          {/* Tab Display Body */}
          <Layer3D z={25}>
            <div className="relative mt-4 min-h-[200px] rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 text-muted-foreground leading-relaxed"
                  >
                    <div className="flex items-center justify-between text-neon-cyan text-[11px] pb-1">
                      <span>// DEVELOPER_PROFILE</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> ACTIVE
                      </span>
                    </div>
                    <p><span className="text-neon-purple font-bold">const</span> developer = &#123;</p>
                    <p className="pl-4">name: <span className="text-white font-medium">"N Sumanth Kamath"</span>,</p>
                    <p className="pl-4">education: <span className="text-sky-300">"B.E. Computer Science Engineering"</span>,</p>
                    <p className="pl-4">cgpa: <span className="text-amber-300 font-bold">9.15 / 10.0</span>,</p>
                    <p className="pl-4">focus: [<span className="text-neon-cyan">"Full Stack Web"</span>, <span className="text-neon-cyan">"Blockchain Security"</span>, <span className="text-neon-cyan">"AI"</span>],</p>
                    <p className="pl-4">goal: <span className="text-pink-300">"Building secure, scalable, and intuitive software"</span></p>
                    <p>&#125;;</p>
                  </motion.div>
                )}

                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between text-neon-cyan pb-1">
                      <span>// TECH STACK OVERVIEW</span>
                      <span className="text-muted-foreground">PRIMARY</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-2 border border-white/5">
                        <div className="flex items-center gap-2 text-foreground font-medium">
                          <Layers className="size-3.5 text-sky-400" />
                          <span>Frontend</span>
                        </div>
                        <span className="text-sky-300 font-mono">React, JavaScript, Tailwind</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-2 border border-white/5">
                        <div className="flex items-center gap-2 text-foreground font-medium">
                          <Server className="size-3.5 text-purple-400" />
                          <span>Backend</span>
                        </div>
                        <span className="text-purple-300 font-mono">Node.js, Express.js, REST</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-2 border border-white/5">
                        <div className="flex items-center gap-2 text-foreground font-medium">
                          <Database className="size-3.5 text-emerald-400" />
                          <span>Databases & Cloud</span>
                        </div>
                        <span className="text-emerald-300 font-mono">MongoDB, MySQL, Firebase</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "domains" && (
                  <motion.div
                    key="domains"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between text-neon-cyan pb-1">
                      <span>// SPECIALIZATION DOMAINS</span>
                      <span className="text-neon-cyan font-bold">3 CORE</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-2.5 text-center">
                        <p className="text-sky-400 font-bold text-xs">Full Stack</p>
                        <p className="text-[10px] text-muted-foreground mt-1">End-to-end web applications & APIs</p>
                      </div>
                      <div className="rounded-xl border border-purple-400/20 bg-purple-400/5 p-2.5 text-center">
                        <p className="text-purple-400 font-bold text-xs">Blockchain</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Smart contracts & access control</p>
                      </div>
                      <div className="rounded-xl border border-pink-400/20 bg-pink-400/5 p-2.5 text-center">
                        <p className="text-pink-400 font-bold text-xs">AI & Systems</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Automation & intelligent UI</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "highlights" && (
                  <motion.div
                    key="highlights"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between text-neon-cyan pb-1">
                      <span>// KEY CREDENTIALS</span>
                      <span className="text-amber-400 font-bold">VERIFIED</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/5 text-muted-foreground">
                        <Sparkles className="size-3.5 text-amber-400 shrink-0" />
                        <span className="text-foreground font-medium">Smart India Hackathon (SIH) Participant</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/5 text-muted-foreground">
                        <Award className="size-3.5 text-neon-cyan shrink-0" />
                        <span className="text-foreground font-medium">Forge Quest Innovation Challenge</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/5 text-muted-foreground">
                        <BookOpen className="size-3.5 text-emerald-400 shrink-0" />
                        <span className="text-foreground font-medium">UiPath RPA & Python Certified</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Layer3D>

          {/* Bottom Quick Stats */}
          <Layer3D z={30}>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { value: "9.15", label: "CGPA", color: "from-amber-400 to-emerald-400" },
                { value: "5+", label: "Projects", color: "from-neon-cyan to-primary" },
                { value: "3", label: "Core Domains", color: "from-primary to-accent" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center transition hover:border-white/20 hover:bg-white/10"
                >
                  <p className={`font-display text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Layer3D>
        </div>
      </Card3D>
    </div>
  );
}
