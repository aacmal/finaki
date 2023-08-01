import { Types } from "mongoose";
import { IUser } from "../interfaces/User";
import UserModel from "../models/user.model";
import TokenModel from "../models/token.model";

export async function isUnique(email: string) {
  const user = await UserModel.findOne<IUser>({ email });
  return user?.email === email;
}

export async function create(userData: IUser) {
  try {
    const user = new UserModel(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
}

export async function getById(userId: string | undefined | Types.ObjectId) {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function pushTransaction(userId: string | undefined | Types.ObjectId, transactionId: Types.ObjectId) {
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      user.transactions.push(transactionId);
      await user.save();
    }
  } catch (error) {
    throw error;
  }
}

export async function pullTransaction(userId: Types.ObjectId, transactionId: Types.ObjectId) {
  try {
    await UserModel.findByIdAndUpdate(
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

export async function pushToken(userId: string | undefined | Types.ObjectId, tokenId: Types.ObjectId) {
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      user.refreshTokens.push(tokenId);
      await user.save();
    }
  } catch (error) {
    throw error;
  }
}

export async function pullToken(userId: string | undefined | Types.ObjectId, tokenId: Types.ObjectId | string) {
  try {
    await UserModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          refreshTokens: tokenId,
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

export async function pushWallet(userId: Types.ObjectId, walletId: Types.ObjectId) {
  try {
    await UserModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          wallets: {
            $each: [walletId],
            $position: 0,
          },
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

export async function pullWallet(userId: Types.ObjectId, walletId: Types.ObjectId) {
  try {
    await UserModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          wallets: walletId,
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

export async function findByRefreshToken(token: string): Promise<IUser | null> {
  try {
    const tokenResult = await TokenModel.findOne({ token }).populate("userId", { refreshTokens: 0, transactions: 0 });
    return tokenResult?.userId as unknown as IUser;
  } catch (error) {
    throw error;
  }
}
