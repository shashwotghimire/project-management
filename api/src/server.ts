import app from "./app";
import "dotenv/config";
import { connectDb } from "./configs/db.config";

const PORT = process.env.PORT;

connectDb().then(() => {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
