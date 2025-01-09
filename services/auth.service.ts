import jwt from "jsonwebtoken";
import { UserDTO } from "../types/user.types";
import { ApiError } from "../middlewares/error.middleware";
import { User } from "../schemas/user.schema";
class AuthService {
  constructor() {}

  key = process.env.JWT_KEY;

  //check if user exists 
  public async userExists(email: string): Promise<boolean> {
    //check in db if user exists
    const user = await User.findOne({
      email: email,
    });
    return user ? true : false;
  }

  //login user and return user data
  public async loginUser(email: string, password: string): Promise<UserDTO> {
    const user = await User.findOne({
      email: email,
    });

    if (!user) throw new ApiError(404, "The user doesnt exist");
    if (await user.login(password)) {
      return user.toDTO();
    }
    throw new ApiError(401, "Wrong Credentials");
  }

  //register user and return user data
  public async registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDTO> {
    if (await this.userExists(email)) {
      throw new ApiError(409, "Email already in use");
    }
    try {
      const hashed_password = await this.hashPassword(password);

      const user_db = new User({
        name,
        email,
        hashed_password,
      });

      user_db.save();
      return user_db.toDTO();
    } catch (err) {
      throw new ApiError(
        500,
        "An error occureed while creating your account please retry",
      );
    }
  }

  //hash password using bcrypt
  public async hashPassword(password: string) {
    const hash = await Bun.password.hash(password);
    return hash;
  }

  //create jwt token
  public createJWT(user: UserDTO) {
    if (!this.key) {
      throw new Error("Server Error");
    }
    const token = jwt.sign(user, this.key, {
      expiresIn: 7200,
    });
    return token;
  }

  //verify jwt token and return if valid
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
