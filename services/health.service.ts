import { ApiError } from "../middlewares/error.middleware";

class HealthService {
  constructor() {}

  public async ping(): Promise<string> {
    return "Pong";
  }
}

export const healthService = new HealthService();
