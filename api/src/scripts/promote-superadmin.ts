import "dotenv/config";
import { User } from "../models/users.model";
import "../models/associations";

const email = process.argv[2];

if (!email) {
  console.error("Please provide an email address. Usage: npx tsx src/scripts/promote-superadmin.ts <email>");
  process.exit(1);
}

const run = async () => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    console.error(`User with email "${email}" not found.`);
    process.exit(1);
  }

  user.role = "superadmin";
  await user.save();

  console.log(`Successfully promoted ${user.username} (${user.email}) to superadmin.`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Error promoting user:", err);
  process.exit(1);
});
