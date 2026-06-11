import { OrganizationsMember } from "./organizations-members.model";
import { Organization } from "./organizations.model";
import { User } from "./users.model";

Organization.belongsToMany(User, {
  through: OrganizationsMember,
  foreignKey: "orgId",
  otherKey: "userId",
  as: "members",
});
User.belongsToMany(Organization, {
  through: OrganizationsMember,
  foreignKey: "userId",
  otherKey: "orgId",
  as: "organizations",
});

User.hasMany(OrganizationsMember, { foreignKey: "userId" });
Organization.hasMany(OrganizationsMember, { foreignKey: "orgId" });
OrganizationsMember.belongsTo(User, { foreignKey: "userId" });
OrganizationsMember.belongsTo(Organization, { foreignKey: "orgId" });

Organization.belongsTo(User, { foreignKey: "adminId", as: "admin" });
User.hasMany(Organization, {
  foreignKey: "adminId",
  as: "ownedOrganizations",
});
