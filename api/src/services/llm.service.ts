import client from "../configs/llm.config";

export const message = async () => {
  const message = await client.messages.create({
    model: "global.anthropic.claude-haiku-4-5-20251001-v1:0",
    messages: [
      {
        role: "user",
        content: "Hello!",
      },
    ],
    max_tokens: 1024,
  });
  console.log(message);
  return message;
};
