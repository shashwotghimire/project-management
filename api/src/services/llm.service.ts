import client from "../configs/llm.config";
import { getTasksAssignedToUser } from "../repositories/tasks.repository";
import { getProjectsByUserId } from "../repositories/projects.repository";
import { getAiSummary, upsertAiSummary } from "../repositories/ai-summary.repository";

export async function getDashboardSummary(data: {
  userId: string;
  orgId: string;
}): Promise<string> {
  const { userId, orgId } = data;
  const cached = await getAiSummary(userId, orgId);
  if (cached) return cached.content;
  return generateDashboardSummary({ userId, orgId });
}

export async function generateDashboardSummary(data: {
  userId: string;
  orgId: string;
}): Promise<string> {
  const { userId, orgId } = data;

  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);

  const allTasks = await getTasksAssignedToUser(userId);
  const orgTasks = allTasks.filter((t) => {
    const projectOrgId = (t as any).project?.organizationId;
    // fallback: keep all if org not joined (repo returns flat tasks)
    return true;
  });

  const tasksDueThisWeek = orgTasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) <= endOfWeek &&
      new Date(t.dueDate) >= now &&
      t.status !== "completed",
  ).length;

  const overdueTasks = orgTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "completed",
  ).length;

  const projectsResult = await getProjectsByUserId(userId, orgId, {
    page: 1,
    limit: 100,
  });
  const projectsNeedingAttention = projectsResult.data.filter(
    (m) => (m as any).Project?.status === "active",
  ).length;

  const response = await client.messages.create({
    model: "global.anthropic.claude-haiku-4-5-20251001-v1:0",
    max_tokens: 100,
    system: `You write single-sentence status summaries for a project management dashboard.
Rules:
- Output ONLY the summary text, nothing else.
- Minimum 2 Max 3 short sentences.
- Lead with the most urgent/important number.
- Plain, direct tone (no exclamation marks, no "Great news!").
- If a count is 0, omit it rather than saying "0 tasks..."`,
    messages: [
      {
        role: "user",
        content: `Data:
- Projects needing attention: ${projectsNeedingAttention}
- Tasks due before end of week: ${tasksDueThisWeek}
- Overdue tasks: ${overdueTasks}`,
      },
    ],
  });

  const block = response.content.find((b) => b.type === "text");
  const text = block?.type === "text" ? block.text : "";
  if (text) await upsertAiSummary(userId, orgId, text);
  return text;
}
