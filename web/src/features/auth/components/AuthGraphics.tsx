import Image from "next/image";

export function AuthGraphicsRegister() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/auth-19-gantt.jpg"
        alt="gantt chart"
        fill
        className="object-cover"
      />
      {/* dark gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {/* text pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
        <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-snug tracking-tight">
          Operate every project, team, and tenant from a single control plane.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Multi-tenant workspaces with role-aware routing, project-scoped
          membership, and platform-level oversight. Designed for engineering
          organizations that ship continuously.
        </p>
      </div>
    </div>
  );
}

export function AuthGraphicsLogin() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/auth-20-workspace.jpg"
        alt="workspace"
        fill
        className="object-cover"
      />
      {/* subtle top-heavy gradient so text collides with the logo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium mb-2">
          Where teams converge
        </p>
        <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-tight tracking-tight text-white">
          Every deadline,<br />Every decision,<br />One place.
        </h2>
      </div>
    </div>
  );
}
