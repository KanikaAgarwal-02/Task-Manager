import User, { IUser } from "../models/User";

export const createUser = (user: Partial<IUser>) => {
  return User.create(user);
};

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};
