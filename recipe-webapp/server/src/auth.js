import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSIONS_FILE = path.join(__dirname, "..", "sessions.json");

function loadSessions() {
  try {
    if (!fs.existsSync(SESSIONS_FILE)) {
      return new Map();
    }

    const data = fs.readFileSync(SESSIONS_FILE, "utf-8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      return new Map();
    }

    const entries = parsed
      .filter((record) => record && typeof record.token === "string")
      .map((record) => [record.token, { username: record.username, createdAt: record.createdAt }]);

    return new Map(entries);
  } catch (error) {
    console.error("Error loading sessions:", error.message);
    return new Map();
  }
}

function saveSessions(sessionsMap) {
  try {
    const payload = Array.from(sessionsMap.entries()).map(([token, session]) => ({
      token,
      username: session.username,
      createdAt: session.createdAt
    }));

    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(payload, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving sessions:", error.message);
  }
}

const sessions = loadSessions();

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

export function createUserPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);
  return `${salt}:${hash}`;
}

export function verifyPassword(password, encodedHash) {
  const [salt, storedHash] = String(encodedHash || "").split(":");
  if (!salt || !storedHash) return false;

  const computedHash = hashPassword(password, salt);
  const storedBuffer = Buffer.from(storedHash, "hex");
  const computedBuffer = Buffer.from(computedHash, "hex");

  if (storedBuffer.length !== computedBuffer.length) return false;
  return crypto.timingSafeEqual(storedBuffer, computedBuffer);
}

export function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { username, createdAt: Date.now() });
  saveSessions(sessions);
  return token;
}

export function getSession(token) {
  if (!token) return null;
  return sessions.get(token) || null;
}

export function deleteSession(token) {
  sessions.delete(token);
  saveSessions(sessions);
}

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = { username: session.username, token };
  next();
}
