"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
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
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  UserCircle,
  ChevronsUpDown,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Organizations", href: "/admin/organizations", icon: Building2 },
  { label: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useGetUserProfile();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    queryClient.clear();
    router.push("/login");
  };

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "?";
  const gravatarUrl = user?.gravatarUrl;

  return (
    <Sidebar className="border-r [&_[data-sidebar=sidebar]]:bg-white [&_[data-sidebar=sidebar-inner]]:bg-white">
      {/* Header */}
      <SidebarHeader className="px-4 pt-4 pb-3 border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Admin
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3">
        {/* Workspace section */}
        <SidebarGroup className="p-0 pt-2">
          <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
            System Control
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {adminNav.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"));
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
                    <Link href={href}>
                      <Icon
                        className={`size-4 shrink-0 ${isActive ? "text-zinc-700" : "text-zinc-400"}`}
                      />
                      <span>{label}</span>
                      {isActive && (
                        <span className="ml-auto size-1.5 rounded-full bg-red-500" />
                      )}
                    </Link>
                  </Button>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Back to App section */}
        <SidebarGroup className="mt-4">
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start gap-3 h-10 px-3 text-sm font-normal text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              >
                <Link href="/onboarding">
                  <ArrowLeft className="size-4 shrink-0 text-zinc-400" />
                  <span>Exit Admin Panel</span>
                </Link>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — user info */}
      <SidebarFooter className="px-4 py-4 border-t mt-auto">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full rounded-lg px-1 py-1.5 hover:bg-zinc-100 transition-colors text-left outline-none">
                {gravatarUrl?.startsWith("http") ? (
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
                <Link href="/profile">
                  <UserCircle className="size-4 mr-2" />
                  Profile
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
