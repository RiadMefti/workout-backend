import { Request, Response, NextFunction } from "express";
import { CreateApiError } from "../utils/helpers";
import { authService } from "../services/auth.service";
import { UserDTO } from "../types/user.types";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: UserDTO;
    }
  }
}

export function Authorization(req: Request, res: Response, next: NextFunction) {
  // List of routes to exclude from the middleware
  const excludedRoutes = ["/auth/login", "/auth/register", "/health"];
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return CreateApiError("Unauthorized", 401, res);
  }

  const token = authHeader.split(" ")[1];
  try {
    const valid = authService.verifyJWT(token);
    if (!valid) {
      return CreateApiError("Unauthorized", 401, res);
    }

    const decoded = jwt.decode(token) as UserDTO;
    req.user = decoded;
    next();
  } catch (error) {
    return CreateApiError("Unauthorized", 401, res);
  }
}
