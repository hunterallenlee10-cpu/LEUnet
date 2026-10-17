import { NextResponse } from "next/server";

/**
 * Largest request body the API routes read. Above the most a real form can
 * post: no form has more than one 10,000-character box, which comes to about
 * 30 KB even in a three-byte script. Capping the bytes read stops a bot
 * making a route buffer megabytes before any field check runs.
 */
const MAX_BODY_BYTES = 100_000;

/**
 * Reads a JSON object from the request, or returns the response to send
 * instead: 413 for a body over MAX_BODY_BYTES, 400 for one that is not JSON or
 * is JSON but not an object (null, an array, a bare string). Never throws.
 *
 * The body is read as a stream and abandoned as soon as it passes the cap, so
 * a missing or false content-length header does not get around it.
 */
export async function readJsonBody(
  request: Request
): Promise<Record<string, unknown> | NextResponse> {
  const tooLarge = () =>
    NextResponse.json({ error: "Payload too large" }, { status: 413 });
  const invalid = () =>
    NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return tooLarge();
  }

  let parsed: unknown;
  try {
    let text = "";
    if (request.body) {
      const reader = request.body.getReader();
      const decoder = new TextDecoder();
      let bytes = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BODY_BYTES) {
          reader.cancel().catch(() => {});
          return tooLarge();
        }
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
    }
    parsed = JSON.parse(text);
  } catch {
    // Not JSON, or the upload broke off part way.
    return invalid();
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return invalid();
  }
  return parsed as Record<string, unknown>;
}

/**
 * A posted field as a string, or "" when it is missing or anything else. A
 * number or object where text belongs is treated as an empty field, so it gets
 * the field's usual "required" error rather than crashing the route.
 */
export function stringField(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** The field error for text over its FIELD_LIMITS cap. */
export function tooLongMessage(max: number): string {
  return `Please keep this under ${max} characters`;
}
