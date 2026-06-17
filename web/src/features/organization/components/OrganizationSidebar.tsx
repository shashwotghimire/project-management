"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/Logo";
import { useGetOrganizationById } from "@/features/organization/hooks/useOrganization";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CalendarDays,
  Settings,
  ShieldCheck,
  LogOut,
  UserCircle,
  ChevronsUpDown,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workspaceNav = [
  { label: "Dashboard", href: "", icon: LayoutDashboard },
  { label: "Projects", href: "projects", icon: FolderKanban },
  { label: "Members", href: "members", icon: Users },
  { label: "Calendar", href: "calendar", icon: CalendarDays },
  { label: "Settings", href: "settings", icon: Settings },
];

export function AppSidebar() {
  const params = useParams<{ id: string }>();
  const orgId = params?.id ?? "";
  const pathname = usePathname();

  const router = useRouter();
  const { data: org } = useGetOrganizationById(orgId);
  const { data: user } = useGetUserProfile();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const isSuperAdmin = user?.role === "superadmin";
  const basePath = `/organization/${orgId}`;

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "?";
  const gravatarUrl = user?.gravatarUrl;

  return (
    <Sidebar className="border-r [&_[data-sidebar=sidebar]]:bg-white [&_[data-sidebar=sidebar-inner]]:bg-white">
      {/* Header */}
      <SidebarHeader className="px-4 pt-4 pb-3 border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="text-[11px] text-muted-foreground font-medium">
            V0.4
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3">
        {/* Workspace section */}
        <SidebarGroup className="p-0 pt-2">
          <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {workspaceNav.map(({ label, href, icon: Icon }) => {
              const fullHref = href ? `${basePath}/${href}` : basePath;
              const isActive =
                pathname === fullHref || pathname.startsWith(fullHref + "/");
              return (
                <SidebarMenuItem key={href}>
                  <Button
                    asChild
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-10 px-3 text-sm font-normal ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900 font-medium"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    <Link href={fullHref}>
                      <Icon
                        className={`size-4 shrink-0 ${isActive ? "text-zinc-700" : "text-zinc-400"}`}
                      />
                      <span>{label}</span>
                      {isActive && (
                        <span className="ml-auto size-1.5 rounded-full bg-blue-500" />
                      )}
                    </Link>
                  </Button>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Platform section — superadmin only */}
        {isSuperAdmin && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
              Platform
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="h-8 rounded-md px-3 text-sm font-normal text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Link href="/admin">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>Super Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer — user info */}
      <SidebarFooter className="px-4 py-4 border-t mt-auto">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full rounded-lg px-1 py-1.5 hover:bg-zinc-100 transition-colors text-left outline-none">
                {gravatarUrl ? (
                  <img
                    src={gravatarUrl}
                    alt={user.username}
                    className="size-9 rounded-full shrink-0 object-cover"
                  />
                ) : (
                  <div className="size-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                    {initials}
                  </div>
                )}
                <div className="flex flex-col min-w-0 leading-tight flex-1">
                  <span className="text-sm font-semibold truncate">
                    {user.username}
                  </span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
                <ChevronsUpDown className="size-4 text-muted-foreground shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">{user.username}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/organization/${orgId}/settings`}>
                  <UserCircle className="size-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/onboarding">
                  <ArrowLeftRight className="size-4 mr-2" />
                  Switch organization
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="size-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
