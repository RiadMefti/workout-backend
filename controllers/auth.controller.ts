import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess } from "../utils/helpers";
import { authService } from "../services/auth.service";

class AuthController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const data = authService.registerUser(name, email, password);
    CreateApiSuccess(data, 201, res);
  }
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const data = authService.loginUser(email, password);
    CreateApiSuccess(data, 201, res);
  }
}

export const authController = new AuthController();
