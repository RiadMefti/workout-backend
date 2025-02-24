import { healthService } from "../services/health.service";
import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess } from "../utils/helpers";

class HealthController {
  constructor() {}

  // Ping the server to check if it is running
  public async ping(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = await healthService.ping();
    CreateApiSuccess(data, 200, res);
  }
}

export const healthController = new HealthController();
