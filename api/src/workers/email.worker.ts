import { Worker } from "bullmq";
import { connection } from "../configs/redis-client.config";
import { sendEmail } from "../services/email.service";

export const emailWorker = new Worker(
  "email",
  async (job) => {
    const { to, subject, html } = job.data;
    await sendEmail(to, subject, html);
    console.log(`email sent to ${to}`);
  },
  {
    connection,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Job completed. ${job.id}, ${job.name}}`);
});

emailWorker.on("failed", (job, err) => {
  console.log(
    `Job failed. ${job?.id}, ${job?.name}, ${err?.name}, ${err?.message}`,
  );
});
