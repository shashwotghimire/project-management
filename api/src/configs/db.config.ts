import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.PGDATABASE as string,
  process.env.PGUSER as string,
  process.env.PGPASSWORD as string,
  {
    host: process.env.PGHOST as string,
    dialect: "postgres",
    ssl: process.env.PGSSLMODE === "require",
  },
);

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
