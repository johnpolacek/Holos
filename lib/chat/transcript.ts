import { getJSON, putJSON } from "./storage";

// One JSON file per chat, written by the server only, so the model never sees
// assistant turns a client made up.

export interface Turn {
  role: "user" | "assistant";
  text: string;
  source?: "ai" | "canned" | "gate";
  at: string;
}

export interface Transcript {
  id: string;
  visitor: string;
  createdAt: string;
  updatedAt: string;
  turns: Turn[];
}

export const CHAT_ID = /^\d{8}-[a-z0-9]{8,32}$/;

const key = (id: string) => `chats/${id}.json`;

export async function loadTranscript(id: string, visitor: string): Promise<Transcript> {
  const stored = await getJSON<Transcript>(key(id));
  // A chat id belongs to the visitor who started it.
  if (stored && stored.data.visitor === visitor) return stored.data;
  const now = new Date().toISOString();
  return { id, visitor, createdAt: now, updatedAt: now, turns: [] };
}

export async function saveTranscript(transcript: Transcript): Promise<void> {
  transcript.updatedAt = new Date().toISOString();
  await putJSON(key(transcript.id), transcript);
}
