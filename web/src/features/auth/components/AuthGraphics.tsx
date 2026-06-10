type GraphicProps = {
  className?: string;
};

export function AuthGraphics({ className = "" }: GraphicProps) {
  const log = [
    {
      t: "11:42:08",
      l: "INFO",
      m: "tenant.acme — session.granted user=ada",
    },
    {
      t: "11:42:09",
      l: "OK",
      m: "policy.eval scope=projects:read → allow",
    },
    {
      t: "11:42:11",
      l: "INFO",
      m: "router.match → /dashboard tenant=acme",
    },
    {
      t: "11:42:14",
      l: "INFO",
      m: "queue.drain pending=14 → 0 (382ms)",
    },
    {
      t: "11:42:18",
      l: "OK",
      m: "edge.eu-west-1 healthcheck 200",
    },
  ];

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between ${className}`}
    >
      {/* Hero */}
      <div className="relative flex-1 flex items-center">
        <div className="w-full">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
            01 — System
          </div>

          <div
            className="leading-[0.85] tracking-[-0.04em] text-white"
            style={{
              fontWeight: 200,
              fontSize: "clamp(96px, 14vw, 184px)",
            }}
          >
            OPERATE.
          </div>

          <div className="mt-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
            <span className="h-px w-10 bg-white/30" />
            Every tenant. Every project. One plane.
          </div>
        </div>

        {/* Rings */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2"
          width="360"
          height="360"
          viewBox="0 0 360 360"
        >
          <circle
            cx="180"
            cy="180"
            r="178"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
          />
          <circle
            cx="180"
            cy="180"
            r="140"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
          />
          <circle
            cx="180"
            cy="180"
            r="100"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
          />
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="none"
            stroke="#3b82f6"
            strokeDasharray="2 3"
          />

          <circle cx="320" cy="180" r="2.5" fill="#3b82f6" />
          <circle cx="180" cy="40" r="1.5" fill="white" />
          <circle cx="80" cy="260" r="1.5" fill="rgba(255,255,255,0.7)" />
        </svg>
      </div>

      {/* Log Feed */}
      <div className="border border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
          <span>edge.log — tail</span>

          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
            streaming
          </span>
        </div>

        <ul className="font-mono text-[11px] leading-relaxed px-3 py-2.5 space-y-1">
          {log.map((row, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-white/40">{row.t}</span>

              <span
                className={`w-7 ${
                  row.l === "OK" ? "text-green-400" : "text-blue-400"
                }`}
              >
                {row.l}
              </span>

              <span className="text-white/75 truncate">{row.m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
