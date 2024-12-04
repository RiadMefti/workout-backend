import jwt from "jsonwebtoken";
import { CreateApiError } from "../utils/helpers";
class AuthService {
  constructor() {}

  key = process.env.JWT_KEY;
  public userExists(email: string): boolean {
    //check in db if user exists
    return false;
  }

  public registerUser() {}

  public getUserHashPassowrd() {}

  public async hashPassowrd(password: string) {
    const hash = await Bun.password.hash(password);
    return hash;
  }

  public async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await Bun.password.verify(password, hashedPassword);
    return isMatch;
  }

  public createJWT() {
    if (!this.key) {
      throw new Error("Server Error");
    }
    const token = jwt.sign({}, this.key);
    return token;
  }

  public verifyJWT(token: string): boolean {
    if (!this.key) {
      throw new Error("Server Error");
    }
    try {
      jwt.verify(token, this.key);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export const authService = new AuthService();
