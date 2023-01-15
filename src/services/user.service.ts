import { IUser } from "../../types/User";
import User from "../models/User";

async function isUnique(email: string) {
  const user = await User.findOne<IUser>({ email });
  return user?.email === email;
}

async function create(userData: IUser) {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
}

async function getById(id: string) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

export { create, getById, isUnique };
