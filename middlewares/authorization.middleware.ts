import { Request, Response, NextFunction } from "express";
import { CreateApiError, HandleError } from "../utils/helpers";
import { authService } from "../services/auth.service";

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
    const decoded = authService.verifyJWT(token);

    if (!decoded) {
      return CreateApiError("Unauthorized", 401, res);
    } else {
      next();
    }
  } catch (error) {
    return CreateApiError("Unauthorized", 401, res);
  }
}
