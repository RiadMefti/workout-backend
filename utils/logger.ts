import morgan from "morgan";
import { Request } from "express";

// Utilisation de morgan pour logger les requêtes
morgan.token("body", (req: Request) => JSON.stringify(req.body));

const logger = morgan((tokens, req, res) => {
  return [
    "\n🔨 API Request:",
    `Method: ${tokens.method(req, res)}`,
    `URL: ${tokens.url(req, res)}`,
    `Response Time: ${tokens["response-time"](req, res)}ms`,
    `Body: ${tokens.body(req, res)}`,
    `IP: ${tokens["remote-addr"](req, res)}`,
    "-------------------",
  ].join(" ");
});

export default logger;
