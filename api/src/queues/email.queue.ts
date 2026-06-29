import { Queue } from "bullmq";
import { connection } from "../configs/redis-client.config";

export const emailQueue = new Queue("email", { connection });
