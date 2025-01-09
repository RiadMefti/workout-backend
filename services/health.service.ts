class HealthService {
  constructor() {}

  //check if the server is up 
  public async ping(): Promise<string> {
    return "Pong";
  }
}

export const healthService = new HealthService();
