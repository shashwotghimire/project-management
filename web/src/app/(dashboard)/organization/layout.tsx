import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/organization/components/OrganizationSidebar";
import { OrganizationNavbar } from "@/features/organization/components/OrganizationNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <OrganizationNavbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
