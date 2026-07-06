import { AiSummary } from "../models/ai-summary.model";

export async function getAiSummary(userId: string, orgId: string): Promise<AiSummary | null> {
  return AiSummary.findOne({ where: { userId, orgId } });
}

export async function upsertAiSummary(
  userId: string,
  orgId: string,
  content: string,
): Promise<AiSummary> {
  const [summary] = await AiSummary.upsert({ userId, orgId, content });
  return summary;
}
