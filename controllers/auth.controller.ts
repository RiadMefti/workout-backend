import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess } from "../utils/helpers";
import { authService } from "../services/auth.service";

class AuthController {
  constructor() {}

  public async createJWT(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = authService.createJWT();
    CreateApiSuccess(data, 200, res);
  }
}

export const authController = new AuthController();
