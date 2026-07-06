import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import SuperAdminGuard from "@/components/SuperAdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuperAdminGuard>
      <SidebarProvider>
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <main className="flex-1 overflow-auto bg-zinc-50/50">{children}</main>
        </div>
      </SidebarProvider>
    </SuperAdminGuard>
  );
}
