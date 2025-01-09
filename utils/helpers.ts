import { Request, Response, NextFunction } from "express";
import { ErrorResponse, SuccessResponse } from "../types/response.types";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

// Va prendre une fonction de contrôleur et la retourner avec un gestionnaire d'erreur qui va catch les erreurs et les passer à next
export function HandleError(func: ControllerFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
}

// Va retourner une réponse JSON avec un objet de données et un code de statut SUCCESS
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


// Va retourner une réponse JSON avec un objet d'erreur et un code de statut ERROR
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
