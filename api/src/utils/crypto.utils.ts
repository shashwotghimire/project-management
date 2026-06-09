import crypto from "crypto";

export function createRandomToken(length: number = 32) {
  return crypto.randomBytes(length).toString("hex");
}
