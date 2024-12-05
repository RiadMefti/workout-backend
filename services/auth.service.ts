import jwt from "jsonwebtoken";
import { CreateApiError } from "../utils/helpers";
import { UserDTO } from "../types/user.types";
import { ApiError } from "../middlewares/error.middleware";
class AuthService {
  constructor() {}

  key = process.env.JWT_KEY;
  public userExists(email: string): boolean {
    //check in db if user exists
    return false;
  }

  public async loginUser(email: string, password: string): Promise<UserDTO> {
    const hashed_password = await this.hashPassword(password);
    //call DB to get the password
    const db_hashed_password = "normaly_pwd_here";

    const isPasswordSimilare = await this.verifyPassword(
      db_hashed_password,
      hashed_password,
    );
    if (!isPasswordSimilare) {
      throw new ApiError(401, "Your password or email is WRONG ");
    }

    const user: UserDTO = {
      email,
      profile_picture: "Default",
      name: "some name",
      id: "some id",
    };

    return user;
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
