export type User = {
  id: string;
  name: string;
  email: string;
  hashed_password: string;
  created_at: Date;
  last_modified: Date;
  profile_picture: string;
};

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
};
