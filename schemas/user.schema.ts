import * as mongoose from "mongoose";
import { UserDTO } from "../types/user.types";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    hashed_password: { type: String, required: true },
    profile_picture: { type: String, default: "default" },
    next_workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', default: null },

  },
  {
    methods: {
      async login(password: string): Promise<boolean> {
        if (await Bun.password.verify(password, this.hashed_password)) {
          return true;
        }
        return false;
      },
      toDTO(): UserDTO {
        return {
          _id: this._id.toString(),
          name: this.name,
          email: this.email,
          profile_picture: this.profile_picture,
          next_workout: this.next_workout ? this.next_workout.toString() : null,
        };
      },
    },
  },
);
export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);
