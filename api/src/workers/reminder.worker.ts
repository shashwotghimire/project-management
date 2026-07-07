import { Worker } from "bullmq";
import {
  sendDeadlineReminders,
  sendOverdueTasksReminder,
} from "../services/deadline-reminder.service";
import { connection } from "../configs/redis-client.config";
export const reminderWorker = new Worker(
  "reminder",
  async (job) => {
    await sendDeadlineReminders();
    await sendOverdueTasksReminder();
  },
  { connection },
);

reminderWorker.on("completed", (job) => {
  console.log(`Job completed. ${job.id}, ${job.name}}`);
});

reminderWorker.on("failed", (job, err) => {
  console.log(
    `Job failed. ${job?.id}, ${job?.name}, ${err?.name}, ${err?.message}`,
  );
});
