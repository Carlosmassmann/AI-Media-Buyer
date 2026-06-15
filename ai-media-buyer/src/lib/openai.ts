import OpenAI from "openai";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

function getOpenAI(): OpenAI {
  if (!globalForOpenAI.openai) {
    globalForOpenAI.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return globalForOpenAI.openai;
}

export { getOpenAI };
export default getOpenAI;
