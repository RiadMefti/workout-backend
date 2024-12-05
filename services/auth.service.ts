import jwt from "jsonwebtoken";
import { CreateApiError } from "../utils/helpers";
import { UserDTO } from "../types/user.types";
class AuthService {
  constructor() {}

  key = process.env.JWT_KEY;
  public userExists(email: string): boolean {
    //check in db if user exists
    return false;
  }

  public async registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDTO> {
    const hashed_password = await this.hashPassword(password);

    // #TODO add it to db

    const user: UserDTO = {
      id: "someId",
      name,
      profile_picture: "Default",
      email,
    };

    return user;
  }

  public getUserHashPassword() {}

  public async hashPassword(password: string) {
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
