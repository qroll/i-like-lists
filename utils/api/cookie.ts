import crypto from "crypto";
import Csrf from "csrf";
import { HttpError } from "../../lib/error/errors";

const cookieEncryptionKey = "REtgV24bDB7xQYoMuypiBASMEaJbc59nJWChoXbbmsA";
const cookieSigningKey = "E99AD7D0E3A73040F9214285814725F3";

export function encryptAndSignCookie(value: any): string {
  const stringifiedCookie = JSON.stringify(value);

  const key = Buffer.from(cookieEncryptionKey, "base64");
  const ivBuffer = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, ivBuffer);

  const iv = ivBuffer.toString("base64");

  let encrypted = cipher.update(stringifiedCookie, "utf8", "base64");
  encrypted += cipher.final("base64");

  const hmac = crypto.createHmac("sha256", cookieSigningKey);
  const hash = hmac.update(encrypted).digest("base64");

  const cookie = iv + "." + encrypted + "." + hash;

  return cookie;
}

export function decryptCookie(cookie: string): any {
  const [iv, encrypted, hash] = cookie.split(".");

  const hmac = crypto.createHmac("sha256", cookieSigningKey);
  const computedHash = hmac.update(encrypted).digest("base64");

  if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(computedHash))) {
    throw HttpError.Unauthorised();
  }

  const key = Buffer.from(cookieEncryptionKey, "base64");
  const ivBuffer = Buffer.from(iv, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}

export async function generateCsrf(): Promise<{ csrfSecret: string; csrfToken: string }> {
  const csrf = new Csrf();
  const csrfSecret = await csrf.secret();
  const csrfToken = csrf.create(csrfSecret);

  return { csrfSecret, csrfToken };
}
