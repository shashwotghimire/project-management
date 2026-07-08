"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

/* ─── Motion helpers ─── */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : (shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 })}
      transition={{
        duration: shouldReduce ? 0 : 0.5,
        ease: shouldReduce ? undefined : ([0.16, 1, 0.3, 1] as [number, number, number, number]),
        delay: shouldReduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Nav ─── */

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-background rotate-45" />
          </div>
          <span className="font-semibold tracking-tight">TeamWork</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="https://api.shashwotghimire.tech/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            API Docs
          </a>
          <a
            href="https://github.com/shashwotghimire/project-management"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
          >
            Sign in
          </a>
          <Button size="sm" asChild>
            <a href="/register">Start free</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */

function Hero() {
  const shouldReduce = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  function heroTransition(delay: number) {
    return {
      duration: shouldReduce ? 0 : 0.5,
      ease: shouldReduce ? undefined : ease,
      delay: shouldReduce ? 0 : delay,
    };
  }

  return (
    <section className="pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition(0)}
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Project Management System
          </span>
        </motion.div>
        <motion.h1
          className="text-[clamp(38px,5.5vw,76px)] leading-[1.02] font-semibold tracking-tight mb-6 max-w-4xl mx-auto"
          style={{ textWrap: "balance" } as React.CSSProperties}
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition(0.08)}
        >
          Ship on time without blowing the budget{" "}
          <span className="text-primary">or cutting scope.</span>
        </motion.h1>
        <motion.p
          className="text-[15px] text-muted-foreground max-w-xl mx-auto leading-relaxed mb-5"
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition(0.14)}
        >
          Tasks, channels, and calendars — unified in one workspace. Built for
          teams that can&apos;t afford to sacrifice one constraint for another.
        </motion.p>
        {/* Proof point — visually separated from body copy */}
        <motion.p
          className="text-xs text-muted-foreground/70 mb-8 tracking-wide"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={heroTransition(0.18)}
        >
          Trusted by <strong className="text-muted-foreground font-medium">48 teams</strong> shipping across{" "}
          <strong className="text-muted-foreground font-medium">214 active projects</strong>
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-14"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition(0.22)}
        >
          <Button size="lg" asChild>
            <a href="/register">
              Create a workspace <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">See how it works</a>
          </Button>
        </motion.div>
      </div>

      {/* Hero screenshot stack */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(300px, 36vw, 520px)" }}
        initial={shouldReduce ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduce ? 0 : 0.7,
          ease: shouldReduce ? undefined : ease,
          delay: shouldReduce ? 0 : 0.28,
        }}
      >
        {/* Left — project/kanban board */}
        <div
          className="absolute rounded-t-xl overflow-hidden border border-border/80"
          style={{
            left: "clamp(0px, 2vw, 48px)",
            top: "clamp(40px, 5.5vw, 80px)",
            width: "clamp(300px, 38vw, 540px)",
            zIndex: 2,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}
        >
          <Image
            src="/project.png"
            alt="Kanban project board"
            width={540}
            height={360}
            className="w-full block"
            priority
          />
        </div>

        {/* Center — dashboard */}
        <div
          className="absolute rounded-t-xl overflow-hidden border border-border"
          style={{
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: "clamp(380px, 50vw, 720px)",
            zIndex: 4,
            boxShadow: "0 20px 72px rgba(0,0,0,0.28)",
          }}
        >
          <Image
            src="/dashboard.png"
            alt="Dashboard overview"
            width={720}
            height={480}
            className="w-full block"
            priority
          />
        </div>

        {/* Right — task details */}
        <div
          className="absolute rounded-t-xl overflow-hidden border border-border/80"
          style={{
            right: "clamp(0px, 2vw, 48px)",
            top: "clamp(40px, 5.5vw, 80px)",
            width: "clamp(300px, 38vw, 540px)",
            zIndex: 2,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}
        >
          <Image
            src="/Taskdetails.png"
            alt="Task details panel"
            width={540}
            height={360}
            className="w-full block"
            priority
          />
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Triangle ─── */

const VERTICES = [
  {
    key: "quality",
    label: "QUALITY",
    x: 150,
    y: 20,
    tx: 150,
    ty: 10,
    anchor: "middle" as const,
    consequence: "Prioritize quality → timeline and budget pressure rise",
  },
  {
    key: "cost",
    label: "COST",
    x: 30,
    y: 220,
    tx: 18,
    ty: 238,
    anchor: "middle" as const,
    consequence: "Prioritize cost → scope or time must give",
  },
  {
    key: "time",
    label: "TIME",
    x: 270,
    y: 220,
    tx: 282,
    ty: 238,
    anchor: "middle" as const,
    consequence: "Prioritize time → quality or budget will slip",
  },
];

function Triangle() {
  const [active, setActive] = useState<string | null>(null);

  function activate(key: string) {
    setActive((prev) => (prev === key ? null : key));
  }
  function deactivate() {
    setActive(null);
  }

  return (
    <section
      id="triangle"
      className="max-w-[1280px] mx-auto px-6 py-20 border-b border-border"
    >
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <Reveal className="lg:col-span-5">
          <h2
            className="text-[44px] font-semibold tracking-tight leading-tight max-w-sm"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            You don&apos;t have to pick two.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 flex items-end">
          <p className="text-muted-foreground leading-relaxed">
            Every project management tool assumes the iron triangle is a law:
            pick two of cost, time, and quality. TeamWork treats it as a design
            space — a surface you can navigate, not a wall you hit.
          </p>
        </Reveal>
      </div>
      <Reveal>
        <div className="flex justify-center">
          <div className="max-w-[720px] w-full aspect-[16/9] bg-gradient-to-br from-secondary via-background to-primary/5 rounded-lg border border-border flex items-center justify-center relative">
            <svg viewBox="0 0 300 250" className="w-4/5 h-4/5">
              {VERTICES.map((v, i) => {
                const next = VERTICES[(i + 1) % 3];
                const isDimmed =
                  active !== null && active !== v.key && active !== next.key;
                return (
                  <line
                    key={v.key}
                    x1={v.x}
                    y1={v.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    style={{
                      opacity: isDimmed ? 0.1 : 0.3,
                      transition: "opacity 0.2s",
                    }}
                  />
                );
              })}
              {VERTICES.map((v) => (
                <line
                  key={v.key + "-median"}
                  x1={v.x}
                  y1={v.y}
                  x2={150}
                  y2={140}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4"
                  style={{
                    opacity: active === v.key ? 0.5 : 0.15,
                    transition: "opacity 0.2s",
                  }}
                />
              ))}
              {VERTICES.map((v) => (
                <g
                  key={v.key}
                  role="button"
                  tabIndex={0}
                  aria-label={`${v.label}: ${v.consequence}`}
                  onMouseEnter={() => setActive(v.key)}
                  onMouseLeave={deactivate}
                  onTouchStart={(e) => { e.preventDefault(); activate(v.key); }}
                  onClick={() => activate(v.key)}
                  onFocus={() => setActive(v.key)}
                  onBlur={deactivate}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && activate(v.key)}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <circle cx={v.x} cy={v.y} r={14} fill="transparent" />
                  <text
                    x={v.tx}
                    y={v.ty}
                    textAnchor={v.anchor}
                    style={{
                      fontSize: "10px",
                      fontFamily: "inherit",
                      fontWeight: active === v.key ? 700 : 400,
                      fill: active === v.key ? "var(--color-primary)" : "currentColor",
                      transition: "fill 0.2s",
                    }}
                  >
                    {v.label}
                  </text>
                </g>
              ))}
              <circle
                cx="150"
                cy="140"
                r="6"
                style={{ fill: "var(--color-primary)" }}
              />
              <text
                x="150"
                y="160"
                textAnchor="middle"
                style={{
                  fontSize: "9px",
                  fontFamily: "inherit",
                  fill: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                EQUILIBRIUM
              </text>
            </svg>
            {active && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background border border-border rounded-md px-3 py-1.5 whitespace-nowrap pointer-events-none">
                {VERTICES.find((v) => v.key === active)?.consequence}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Screenshots ─── */

function Screenshots() {
  const [activeTab, setActiveTab] = useState(0);
  const shouldReduce = useReducedMotion();
  const tabs = [
    {
      label: "Calendar",
      img: "/calendar.png",
      alt: "Deadline calendar",
      caption:
        "All task due dates in one view. Spot collisions before they become problems. Automated email reminders fire 24 h before anything is due.",
    },
    {
      label: "Channels",
      img: "/groupchat.png",
      alt: "Project group chat",
      caption:
        "Every project gets its own group chat. Decisions stay scoped — not lost in a company-wide feed.",
    },
  ];

  return (
    <section id="features" className="border-b border-border">
      {/* Row 1 — Kanban */}
      <Reveal className="py-24 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <h3
              className="text-[36px] font-semibold tracking-tight leading-tight max-w-sm"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Tasks move as fast as your team.
            </h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              Drag tasks across To Do, In Progress, and Completed. Priority
              badges and due dates stay visible at every step.
            </p>
          </div>
          <div
            className="rounded-xl overflow-hidden border border-border w-full"
            style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.10)" }}
          >
            <Image
              src="/project.png"
              alt="Kanban project board"
              width={1280}
              height={720}
              className="w-full block"
            />
          </div>
        </div>
      </Reveal>

      {/* Row 2 — Task detail */}
      <Reveal className="py-24 border-b border-border bg-secondary/20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse lg:items-end lg:justify-between gap-6 mb-12">
            <h3
              className="text-[36px] font-semibold tracking-tight leading-tight lg:text-right max-w-sm"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Full context, right on the task.
            </h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              Assignee, due date, description, comments, and a live activity
              log — all in one panel. Know who changed what and when, without
              asking.
            </p>
          </div>
          <div
            className="rounded-xl overflow-hidden border border-border w-full"
            style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.10)" }}
          >
            <Image
              src="/Taskdetails.png"
              alt="Task details and activity log"
              width={1280}
              height={720}
              className="w-full block"
            />
          </div>
        </div>
      </Reveal>

      {/* Row 3 — Tabbed switcher */}
      <Reveal className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <h3
              className="text-[36px] font-semibold tracking-tight leading-tight max-w-sm"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Every deadline. Every conversation.
            </h3>
            <div className="flex gap-2">
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    activeTab === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-lg mb-10">
            {tabs[activeTab].caption}
          </p>
          <div
            className="rounded-xl overflow-hidden border border-border w-full"
            style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.10)" }}
          >
            <motion.div
              key={activeTab}
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduce ? 0 : 0.2 }}
            >
              <Image
                src={tabs[activeTab].img}
                alt={tabs[activeTab].alt}
                width={1280}
                height={720}
                className="w-full block"
              />
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Features ─── */

function Features() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal className="max-w-2xl mb-20">
          <h2
            className="text-[44px] font-semibold tracking-tight leading-tight"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Production-grade{" "}
            <span className="text-muted-foreground">from day one.</span>
          </h2>
        </Reveal>

        <div className="space-y-32">
          {/* Multi-tenant orgs */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                    Organizations
                  </div>
                  <div className="space-y-2">
                    {["Acme Corp", "StartupXYZ", "Design Studio"].map(
                      (org, i) => (
                        <div
                          key={org}
                          className={`flex items-center gap-3 p-2 rounded-md ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/50"}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"}`}
                          >
                            {org[0]}
                          </div>
                          <div className="text-[11px] font-medium">{org}</div>
                          {i === 0 && (
                            <div className="ml-auto text-[9px] text-primary">
                              active
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3
                  className="text-[28px] font-semibold tracking-tight leading-tight mb-4"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Multi-tenant orgs
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  One login, many organizations. Clean role boundaries across
                  every workspace.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Role-based access */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                    Members
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah K.", role: "Owner", color: "bg-red-400" },
                      { name: "Alex M.", role: "Admin", color: "bg-yellow-400" },
                      { name: "Jordan L.", role: "Member", color: "bg-green-400" },
                      { name: "Guest User", role: "Viewer", color: "bg-muted-foreground/40" },
                    ].map((m) => (
                      <div
                        key={m.name}
                        className="flex items-center gap-3 p-2 rounded-md bg-secondary/50"
                      >
                        <div className="w-5 h-5 rounded-full bg-muted-foreground/20" />
                        <div className="text-[11px] font-medium flex-1">{m.name}</div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${m.color}`} />
                          <span className="text-[9px] text-muted-foreground">{m.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <h3
                  className="text-[28px] font-semibold tracking-tight leading-tight mb-4"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Role-based access
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  Owner, admin, member, viewer. Permissions enforced at every
                  layer.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Email invitations + Real-time notifications */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="flex justify-center mb-8">
                  <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                      Pending Invites
                    </div>
                    <div className="space-y-2">
                      {["alex@company.io", "jordan@team.dev"].map((email) => (
                        <div
                          key={email}
                          className="flex items-center gap-3 p-2 rounded-md bg-secondary/50"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px]">
                            ✉
                          </div>
                          <div className="text-[11px] flex-1">{email}</div>
                          <div className="text-[9px] text-yellow-500">pending</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="bg-primary/10 border border-primary/20 rounded-md px-3 py-2 text-[10px] text-center text-primary font-medium">
                        + Invite by email
                      </div>
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[22px] font-semibold tracking-tight leading-tight mb-3"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Email invitations
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  Invite by email. Track pending invites; accept in one click.
                </p>
              </div>
              <div>
                <div className="flex justify-center mb-8">
                  <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                      Notifications
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: 'Sarah assigned you to "API endpoints"', time: "2m ago", dot: "bg-primary" },
                        { text: "Deadline tomorrow: Design review", time: "1h ago", dot: "bg-red-400" },
                        { text: "You were invited to Project Atlas", time: "3h ago", dot: "bg-green-400" },
                      ].map((n) => (
                        <div
                          key={n.text}
                          className="flex gap-2.5 p-2 rounded-md bg-secondary/50"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                          <div>
                            <div className="text-[11px] leading-tight">{n.text}</div>
                            <div className="text-[9px] text-muted-foreground mt-0.5">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[22px] font-semibold tracking-tight leading-tight mb-3"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Real-time notifications
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  In-app alerts over WebSocket for assignments, deadlines, and
                  invitations.
                </p>
              </div>
            </div>
          </Reveal>

          {/* File uploads + Deadline reminders — different artifact shapes */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16">
              {/* File uploads — grid of upload tiles (compact, visual) */}
              <div>
                <div className="mb-8 rounded-xl border border-border bg-card p-5 shadow-lg">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
                    Assets
                  </div>
                  <div className="flex gap-4 mb-4">
                    {[
                      { label: "teamwork-logo.svg", size: "4 KB", color: "bg-primary/10 border-primary/20" },
                      { label: "org-banner.png", size: "128 KB", color: "bg-secondary border-border" },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className={`flex-1 rounded-lg border p-3 ${f.color}`}
                      >
                        <div className="w-8 h-8 rounded bg-muted-foreground/10 flex items-center justify-center text-[10px] mb-2">
                          ↑
                        </div>
                        <div className="text-[10px] font-medium truncate">{f.label}</div>
                        <div className="text-[9px] text-muted-foreground">{f.size}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-muted-foreground border-t border-border pt-3">
                    <span>3 files · 132 KB total</span>
                    <span className="text-green-500">S3 · CDN</span>
                  </div>
                </div>
                <h3
                  className="text-[22px] font-semibold tracking-tight leading-tight mb-3"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  File & logo uploads
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  Project logos, org branding, user avatars — stored on S3,
                  served fast.
                </p>
              </div>

              {/* Deadline reminders — horizontal timeline, not a card */}
              <div>
                <div className="mb-8 rounded-xl border border-border bg-card p-5 shadow-lg">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
                    Reminder Timeline
                  </div>
                  <div className="relative pl-5">
                    {/* Vertical track */}
                    <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
                    {[
                      { label: "API endpoints due", delta: "in 18 h", status: "EMAIL SENT", statusColor: "text-red-400", dot: "bg-red-400" },
                      { label: "Design review", delta: "in 22 h", status: "QUEUED", statusColor: "text-yellow-400", dot: "bg-yellow-400" },
                      { label: "Sprint retro", delta: "in 3 d", status: "PENDING", statusColor: "text-muted-foreground", dot: "bg-muted-foreground/40" },
                    ].map((item) => (
                      <div key={item.label} className="relative flex items-start gap-3 mb-4 last:mb-0">
                        <div className={`absolute -left-5 mt-1 w-3 h-3 rounded-full border-2 border-background ${item.dot} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium truncate">{item.label}</div>
                          <div className="text-[9px] text-muted-foreground">{item.delta}</div>
                        </div>
                        <div className={`text-[8px] font-medium shrink-0 ${item.statusColor}`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border text-[9px] text-muted-foreground">
                    Worker runs every 15 min · auto-retry on failure
                  </div>
                </div>
                <h3
                  className="text-[22px] font-semibold tracking-tight leading-tight mb-3"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Deadline reminders
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  Background workers scan for tasks due within 24 h and fire
                  email + in-app alerts automatically.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */

function CTA() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20 border-b border-border">
      <Reveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-[44px] font-semibold tracking-tight leading-tight mb-8 max-w-md"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Your next project ships differently.
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Button size="lg" asChild>
                <a href="/register">Create a workspace</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/login">Sign in</a>
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border shadow-xl">
            <Image
              src="/landing-graphic.jpg"
              alt="Project blueprint"
              width={720}
              height={480}
              className="w-full block object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-foreground rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-background rotate-45" />
            </div>
            <span className="font-semibold text-sm tracking-tight">TeamWork</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
            Project management that respects all three constraints.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
            Product
          </div>
          <div className="space-y-2">
            {[
              { label: "Features", href: "#features" },
              { label: "API Docs", href: "https://api.shashwotghimire.tech/api-docs" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
            Company
          </div>
          <div className="space-y-2">
            {[
              { label: "GitHub", href: "https://github.com/shashwotghimire/project-management" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <span className="text-sm text-muted-foreground">© 2026 TeamWork</span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Triangle />
      <Screenshots />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
