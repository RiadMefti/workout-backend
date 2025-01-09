import { Request, Response, NextFunction } from "express";
import { CreateApiError, HandleError } from "../utils/helpers";

export class ApiError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }
}

export function ErrorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = err instanceof ApiError ? err.statusCode : 500;
  CreateApiError(err.message, statusCode, res);
}
