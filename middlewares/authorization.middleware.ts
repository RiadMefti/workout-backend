import { Request, Response, NextFunction } from "express";
import { CreateApiError } from "../utils/helpers";
import { authService } from "../services/auth.service";
import { UserDTO } from "../types/user.types";
import jwt from "jsonwebtoken";

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user: UserDTO;
    }
  }
}

// Middleware to check if the request has a valid JWT token
export function Authorization(req: Request, res: Response, next: NextFunction) {
  // List of routes to exclude from the middleware that are public et go to the next middleware
  const excludedRoutes = ["/auth/login", "/auth/register", "/health"];
  if (excludedRoutes.includes(req.path)) {
    return next();
  }


  // Check if the Authorization header is present and starts with Bearer
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return CreateApiError("Unauthorized", 401, res);
  }
  
  // Extract the token from the Authorization header 0 is Bearer and 1 is the token
  const token = authHeader.split(" ")[1];
  try {
    // Verify the token and decode it to get the user information
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
