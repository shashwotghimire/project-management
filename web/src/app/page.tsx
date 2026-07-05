"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-background rotate-45" />
          </div>
          <span className="font-semibold tracking-tight">TeamWork</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="/login">Sign in</a>
          </Button>
          <Button size="sm" asChild>
            <a href="/register">Start free</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Project Operating System
          </span>
        </div>
        <h1 className="text-[clamp(38px,5.5vw,76px)] leading-[1.02] font-semibold tracking-tight mb-6 max-w-4xl mx-auto">
          Ship work in the{" "}
          <span className="text-primary">equilibrium</span> of cost, time, and quality.
        </h1>
        <p className="text-[15px] text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
          Tasks, channels, and calendars — unified in one workspace. Built for
          teams that can&apos;t afford to sacrifice one constraint for another.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <Button size="lg" asChild>
            <a href="/register">
              Create a workspace <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">See how it works</a>
          </Button>
        </div>
        <div className="flex gap-10 justify-center mb-14">
          {[
            { value: "48", label: "Teams onboarded" },
            { value: "214", label: "Projects shipped" },
            { value: "99.98%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold tabular-nums">{stat.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 h-[420px] md:h-[520px]">
        {/* Left: calendar */}
        <div
          className="absolute left-[0%] top-[5%] w-[55%] md:w-[50%] rounded-xl overflow-hidden border border-border shadow-2xl z-[1]"
          style={{ transform: "rotate(-3deg)" }}
        >
          <img src="/calendar.png" alt="Calendar view" className="w-full block" loading="eager" />
        </div>

        {/* Center: kanban (largest, on top) */}
        <div
          className="absolute left-1/2 top-[0%] w-[65%] md:w-[58%] rounded-xl overflow-hidden border border-border shadow-2xl z-[3]"
          style={{ transform: "translateX(-50%)" }}
        >
          <img src="/Kanban.png" alt="Kanban board" className="w-full block" loading="eager" />
        </div>

        {/* Right: groupchat */}
        <div
          className="absolute right-[0%] top-[5%] w-[55%] md:w-[50%] rounded-xl overflow-hidden border border-border shadow-2xl z-[2]"
          style={{ transform: "rotate(3deg)" }}
        >
          <img src="/groupchat.png" alt="Team channels" className="w-full block" loading="eager" />
        </div>
      </div>

      <div className="h-16 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function Triangle() {
  return (
    <section
      id="triangle"
      className="max-w-[1280px] mx-auto px-6 py-20 border-b border-border"
    >
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
            The triangle
          </span>
          <h2 className="text-[44px] font-semibold tracking-tight leading-tight">
            You don&apos;t have to pick two.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex items-end">
          <p className="text-muted-foreground leading-relaxed">
            Every project management tool assumes the iron triangle is a law: pick
            two of cost, time, and quality. TeamWork treats it as a design space — a
            surface you can navigate, not a wall you hit.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[720px] w-full aspect-[16/9] bg-gradient-to-br from-secondary via-background to-primary/5 rounded-lg border border-border flex items-center justify-center">
          <svg viewBox="0 0 300 250" className="w-4/5 h-4/5">
            <polygon points="150,30 270,220 30,220" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="30" x2="150" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4" />
            <line x1="30" y1="220" x2="150" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4" />
            <line x1="270" y1="220" x2="150" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4" />
            <circle cx="150" cy="140" r="6" className="fill-primary" />
            <text x="150" y="20" textAnchor="middle" className="fill-foreground" style={{ fontSize: "10px", fontFamily: "monospace" }}>QUALITY</text>
            <text x="20" y="238" textAnchor="middle" className="fill-foreground" style={{ fontSize: "10px", fontFamily: "monospace" }}>COST</text>
            <text x="280" y="238" textAnchor="middle" className="fill-foreground" style={{ fontSize: "10px", fontFamily: "monospace" }}>TIME</text>
            <text x="150" y="160" textAnchor="middle" className="fill-primary" style={{ fontSize: "9px", fontFamily: "monospace" }}>EQUILIBRIUM</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function KanbanArtifact() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[340px]">
      <div className="flex gap-3 mb-3">
        {["To Do", "In Progress", "Done"].map((col) => (
          <div key={col} className="flex-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">{col}</div>
            <div className="space-y-2">
              {col === "To Do" && (
                <>
                  <div className="bg-secondary/50 rounded-md p-2 text-[11px]">
                    <div className="font-medium mb-1">Setup CI pipeline</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="text-muted-foreground">High</span>
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-md p-2 text-[11px]">
                    <div className="font-medium mb-1">Design auth flow</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="text-muted-foreground">Medium</span>
                    </div>
                  </div>
                </>
              )}
              {col === "In Progress" && (
                <div className="bg-primary/10 border border-primary/20 rounded-md p-2 text-[11px]">
                  <div className="font-medium mb-1">API endpoints</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-muted-foreground">High</span>
                  </div>
                </div>
              )}
              {col === "Done" && (
                <div className="bg-secondary/50 rounded-md p-2 text-[11px] opacity-60">
                  <div className="font-medium mb-1">Project setup</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-muted-foreground">Low</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChannelArtifact() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[340px]">
      <div className="border-b border-border pb-2 mb-3">
        <div className="text-[11px] font-medium"># backend-team</div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-muted-foreground mb-0.5">Sarah · 2m ago</div>
            <div className="bg-secondary/50 rounded-lg rounded-tl-none px-2.5 py-1.5 text-[11px]">
              Deployed v2.1 to staging. Can someone verify the auth flow?
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500/20 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-muted-foreground mb-0.5">Alex · just now</div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg rounded-tl-none px-2.5 py-1.5 text-[11px]">
              On it — testing now<span className="inline-block w-0.5 h-3 bg-primary ml-0.5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarArtifact() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[340px]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-medium">July 2026</div>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-secondary/50 flex items-center justify-center text-[9px]">‹</div>
          <div className="w-4 h-4 rounded bg-secondary/50 flex items-center justify-center text-[9px]">›</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[9px] text-center text-muted-foreground mb-1">
        {["M","T","W","T","F","S","S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-center">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <div
            key={d}
            className={`aspect-square flex items-center justify-center rounded ${
              d === 5 ? "bg-primary text-primary-foreground font-medium" :
              d === 12 || d === 18 ? "bg-red-500/20 text-red-400 font-medium" :
              ""
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-border space-y-1">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-muted-foreground">Jul 12 — API deadline</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-muted-foreground">Jul 18 — Launch review</span>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-3">
            Capabilities
          </span>
          <h2 className="text-[44px] font-semibold tracking-tight leading-tight">
            Opinionated where it matters.
            <br />
            <span className="text-muted-foreground">Flexible where it doesn&apos;t.</span>
          </h2>
        </div>

        <div className="space-y-32">
          {/* Feature 1: Kanban — artifact left, text right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <KanbanArtifact />
            </div>
            <div>
              <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">
                Tasks & Kanban
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Create tasks with priorities, assignees, and due dates. Drag across status lanes — changes sync instantly for everyone on the board.
              </p>
            </div>
          </div>

          {/* Feature 2: Channels — text left, artifact right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2 flex justify-center">
              <ChannelArtifact />
            </div>
            <div className="lg:order-1">
              <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">
                Real-time channels
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Every project gets its own channels. Send messages, share context, and keep decisions close to the tasks they affect — delivered over WebSocket.
              </p>
            </div>
          </div>

          {/* Feature 3: Calendar — artifact left, text right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <CalendarArtifact />
            </div>
            <div>
              <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">
                Deadline calendar
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Pull tasks from every project into one view. Spot collisions, redistribute load, and get automated reminders 24 hours before any deadline.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary features with artifacts */}
        <div className="mt-28 pt-16 border-t border-border">
          <h3 className="text-[20px] font-semibold mb-16 text-muted-foreground">And everything that makes it production-grade.</h3>
          <div className="space-y-32">
            {/* Multi-tenant orgs */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Organizations</div>
                  <div className="space-y-2">
                    {["Acme Corp", "StartupXYZ", "Design Studio"].map((org, i) => (
                      <div key={org} className={`flex items-center gap-3 p-2 rounded-md ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/50"}`}>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"}`}>
                          {org[0]}
                        </div>
                        <div className="text-[11px] font-medium">{org}</div>
                        {i === 0 && <div className="ml-auto text-[9px] text-primary font-mono">active</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">Multi-tenant orgs</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">One login, many organizations. Clean role boundaries across every workspace.</p>
              </div>
            </div>

            {/* Role-based access */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Members</div>
                  <div className="space-y-2">
                    {[{ name: "Sarah K.", role: "Owner", color: "bg-red-400" }, { name: "Alex M.", role: "Admin", color: "bg-yellow-400" }, { name: "Jordan L.", role: "Member", color: "bg-green-400" }, { name: "Guest User", role: "Viewer", color: "bg-muted-foreground/40" }].map((m) => (
                      <div key={m.name} className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
                        <div className="w-5 h-5 rounded-full bg-muted-foreground/20" />
                        <div className="text-[11px] font-medium flex-1">{m.name}</div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${m.color}`} />
                          <span className="text-[9px] font-mono text-muted-foreground">{m.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">Role-based access</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">Owner, admin, member, viewer. Permissions enforced at every layer.</p>
              </div>
            </div>

            {/* Email invitations */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Pending Invites</div>
                  <div className="space-y-2">
                    {["alex@company.io", "jordan@team.dev"].map((email) => (
                      <div key={email} className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px]">✉</div>
                        <div className="text-[11px] flex-1">{email}</div>
                        <div className="text-[9px] font-mono text-yellow-500">pending</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="bg-primary/10 border border-primary/20 rounded-md px-3 py-2 text-[10px] text-center text-primary font-medium">+ Invite by email</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">Email invitations</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">Invite by email. Track pending invites; accept in one click.</p>
              </div>
            </div>

            {/* Real-time notifications */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Notifications</div>
                  <div className="space-y-2">
                    {[
                      { text: "Sarah assigned you to \"API endpoints\"", time: "2m ago", dot: "bg-primary" },
                      { text: "Deadline tomorrow: Design review", time: "1h ago", dot: "bg-red-400" },
                      { text: "You were invited to Project Atlas", time: "3h ago", dot: "bg-green-400" },
                    ].map((n) => (
                      <div key={n.text} className="flex gap-2.5 p-2 rounded-md bg-secondary/50">
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
              <div className="lg:order-1">
                <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">Real-time notifications</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">In-app alerts over WebSocket for assignments, deadlines, and invitations.</p>
              </div>
            </div>

            {/* File & logo uploads */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Assets</div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Project Logo", "Team Avatar", "Org Brand"].map((label) => (
                      <div key={label} className="aspect-square rounded-lg bg-secondary/50 border border-border flex flex-col items-center justify-center gap-1">
                        <div className="w-6 h-6 rounded bg-muted-foreground/20 flex items-center justify-center text-[8px]">↑</div>
                        <div className="text-[8px] text-muted-foreground text-center">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-[9px] text-muted-foreground text-center">Stored on S3 · CDN-served</div>
                </div>
              </div>
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">File & logo uploads</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">Project logos, org branding, user avatars — stored on S3, served fast.</p>
              </div>
            </div>

            {/* Deadline reminders */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 flex justify-center">
                <div className="rounded-xl border border-border bg-card p-4 shadow-lg max-w-[320px] w-full">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Reminder Queue</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-red-500/10 border border-red-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <div className="flex-1">
                        <div className="text-[11px] font-medium">API endpoints due</div>
                        <div className="text-[9px] text-muted-foreground">in 18 hours</div>
                      </div>
                      <div className="text-[8px] font-mono text-red-400">EMAIL SENT</div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-yellow-500/10 border border-yellow-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <div className="flex-1">
                        <div className="text-[11px] font-medium">Design review</div>
                        <div className="text-[9px] text-muted-foreground">in 22 hours</div>
                      </div>
                      <div className="text-[8px] font-mono text-yellow-400">QUEUED</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-border text-[9px] text-muted-foreground text-center">Worker runs every 15 min · auto-retry on failure</div>
                </div>
              </div>
              <div className="lg:order-1">
                <h3 className="text-[28px] font-semibold tracking-tight leading-tight mb-4">Deadline reminders</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">Background workers scan for tasks due within 24h and fire email + in-app alerts automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function CTA() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20 border-b border-border">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
            Equilibrium
          </span>
          <h2 className="text-[44px] font-semibold tracking-tight leading-tight mb-8">
            Stop trading one constraint for another.
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
          <img src="/landing-graphic.jpg" alt="Project blueprint" className="w-full block" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-[1280px] mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-foreground rounded-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-background rotate-45" />
          </div>
          <span className="font-semibold text-sm tracking-tight">TeamWork</span>
          <span className="text-sm text-muted-foreground">© 2024</span>
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Status", "Changelog"].map((link) => (
            <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Triangle />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
