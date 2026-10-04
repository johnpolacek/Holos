import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

// Flat-file JSON store on any S3-compatible bucket. Cloudflare R2 is the default target.
// Without credentials (local dev) it falls back to an in-memory map.

const bucket = process.env.CHAT_S3_BUCKET;
const client =
  bucket && process.env.CHAT_S3_ACCESS_KEY_ID && process.env.CHAT_S3_SECRET_ACCESS_KEY
    ? new S3Client({
        region: process.env.CHAT_S3_REGION ?? "auto",
        endpoint: process.env.CHAT_S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.CHAT_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.CHAT_S3_SECRET_ACCESS_KEY,
        },
      })
    : null;

const memory = new Map<string, { body: string; etag: string }>();
if (!client) console.warn("[chat] No bucket configured. Chats and usage are kept in memory only.");

export interface Stored<T> {
  data: T;
  etag: string | null;
}

export async function getJSON<T>(key: string): Promise<Stored<T> | null> {
  if (!client) {
    const hit = memory.get(key);
    return hit ? { data: JSON.parse(hit.body), etag: hit.etag } : null;
  }
  try {
    const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = await res.Body?.transformToString();
    return body ? { data: JSON.parse(body), etag: res.ETag ?? null } : null;
  } catch (err) {
    if (err instanceof S3ServiceException && err.name === "NoSuchKey") return null;
    throw err;
  }
}

/**
 * Writes JSON. Pass `ifMatch` (an etag, or null for "must not exist yet") to make the
 * write conditional. Returns false when another request changed the object first.
 */
export async function putJSON(
  key: string,
  data: unknown,
  ifMatch?: string | null
): Promise<boolean> {
  const body = JSON.stringify(data);
  if (!client) {
    const current = memory.get(key);
    if (ifMatch !== undefined && (current?.etag ?? null) !== ifMatch) return false;
    memory.set(key, { body, etag: String(Date.now() + Math.random()) });
    return true;
  }
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: "application/json",
        ...(ifMatch === null ? { IfNoneMatch: "*" } : ifMatch ? { IfMatch: ifMatch } : {}),
      })
    );
    return true;
  } catch (err) {
    if (err instanceof S3ServiceException && err.$metadata.httpStatusCode === 412) return false;
    throw err;
  }
}
