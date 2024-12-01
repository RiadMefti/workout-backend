import { Request, Response, NextFunction } from "express";
import { ErrorResponse, SuccessResponse } from "../types/response.types";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export function HandleError(func: ControllerFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
}

export function CreateApiSuccess<T>(
  data: T,
  number = 200,
  res: Response,
): void {
  let response: SuccessResponse<T> = {
    success: true,
    data,
    statusCode: number,
  };

  res.status(number).json(response);
}

export function CreateApiError(
  message: string,
  number = 500,
  res: Response,
): void {
  let response: ErrorResponse = {
    success: false,
    error: message,
    statusCode: number,
  };

  res.status(number).json(response);
}
