import { emailQueue } from "../queues/email.queue";
import {
  getAllTasksDueSoon,
  getAllTasksOverdue,
} from "../repositories/tasks.repository";
import {
  taskDueSoonEmailTemplate,
  taskOverdueEmailTemplate,
} from "../utils/email-template.utils";
import { createNotificationService } from "./notifications.service";

export const sendDeadlineReminders = async () => {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tasks = await getAllTasksDueSoon(now, in24h);

  for (const task of tasks) {
    const assignee = (task as any).assignee;
    const project = (task as any).project;

    if (!assignee || !project) continue;

    await createNotificationService({
      userId: task.assignedTo!,
      orgId: project.organizationId,
      projectId: task.projectId,
      title: "Task due soon",
      message: `"${task.title}" is due within 24 hours`,
      href: `${process.env.FRONTEND_ORIGIN}/organization/${project.organizationId}/projects/${task.projectId}/tasks/${task.id}`,
    });

    await emailQueue.add(
      "task-due-soon",
      {
        to: assignee.email,
        subject: `Reminder: "${task.title}" is due soon`,
        html: taskDueSoonEmailTemplate(
          assignee.username,
          task.title,
          project.name,
          new Date(task.dueDate!),
        ),
      },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
    );
  }
};

export const sendOverdueTasksReminder = async () => {
  const currentDate = new Date();
  const overdueTasks = await getAllTasksOverdue(currentDate);

  for (const task of overdueTasks) {
    const assignee = (task as any).assignee;
    const project = (task as any).project;

    if (!assignee || !project) continue;

    await createNotificationService({
      userId: task.assignedTo!,
      orgId: project.organizationId,
      projectId: task.projectId,
      title: "Task overdue",
      message: `"${task.title}" is overdue`,
      href: `${process.env.FRONTEND_ORIGIN}/organization/${project.organizationId}/projects/${task.projectId}/tasks/${task.id}`,
    });

    await emailQueue.add(
      "task-overdue",
      {
        to: assignee.email,
        subject: `Overdue: "${task.title}" is past its due date`,
        html: taskOverdueEmailTemplate(
          assignee.username,
          task.title,
          project.name,
          new Date(task.dueDate!),
        ),
      },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
    );
  }
};
