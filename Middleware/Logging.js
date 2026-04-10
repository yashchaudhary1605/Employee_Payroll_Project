import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "../logs.txt");

const logger = (req, res, next) => {
  const logData = `${req.method} ${req.url} - ${new Date().toISOString()}\n`;

  try {
    fs.appendFileSync(logFilePath, logData);
  } catch (err) {
    console.error("Error writing log:", err);
  }

  next();
};

export default logger;
