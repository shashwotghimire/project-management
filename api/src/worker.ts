import "dotenv/config";
import "./models/associations";
import "./workers/email.worker";
import "./workers/reminder.worker";
import "./queues/reminder.queue";

console.log("Workers running");
