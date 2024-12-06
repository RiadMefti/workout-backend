import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess } from "../utils/helpers";
import { authService } from "../services/auth.service";

class AuthController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const data = await authService.registerUser(name, email, password);
    const jwt = authService.createJWT(data);

    CreateApiSuccess(
      {
        token: jwt,
        expiresIn: 7200,
        tokenType: "Bearer",
        authState: {
          email: data.email,
          name: data.name,
        },
      },
      201,
      res,
    );
  }
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const data = await authService.loginUser(email, password);
    const jwt = authService.createJWT(data);

    CreateApiSuccess(
      {
        token: jwt,
        expiresIn: 7200,
        tokenType: "Bearer",
        authState: {
          email: data.email,
          name: data.name,
        },
      },
      201,
      res,
    );
  }
}

export const authController = new AuthController();
