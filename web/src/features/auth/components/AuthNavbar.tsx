import Link from "next/link";

export function AuthNavbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-white">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
          <div className="w-4 h-4 bg-black rotate-45" />
        </div>
        <span className="text-lg font-semibold tracking-tight">TeamWork</span>
      </Link>
    </header>
  );
}
