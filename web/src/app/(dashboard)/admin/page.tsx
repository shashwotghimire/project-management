import RolesGuard from "@/components/RolesGuard";

const Admin = () => {
  return (
    <RolesGuard roles={["superadmin"]}>
      <div>Admin Panel</div>
    </RolesGuard>
  );
};

export default Admin;
