import { Types } from "mongoose";
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

async function getById(id: Express.User | undefined) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function pushTransaction(userId: Express.User | undefined, transactionId: Types.ObjectId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.transactions.push(transactionId);
      await user.save();
    }
  } catch (error) {
    throw error;
  }
}

async function removeTransaction(userId: Express.User | undefined, transactionId: string) {
  try {
    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          transactions: transactionId,
        },
      },
      {
        new: true,
      },
    );
  } catch (error) {
    throw error;
  }
}

export { create, getById, isUnique, pushTransaction, removeTransaction };
