import { Queue } from "bullmq";
import { connection } from "../configs/redis-client.config";

export const reminderQueue = new Queue("reminder", { connection });

reminderQueue.add(
  "check-deadlines",
  {},
  {
    repeat: {
      pattern: "0 */5 * * *",
    },
    removeOnComplete: true,
  },
);
