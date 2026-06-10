import RolesGuard from "@/components/RolesGuard";

const page = () => {
  return (
    <RolesGuard roles={["superadmin"]}>
      <div>admin</div>
    </RolesGuard>
  );
};

export default page;
