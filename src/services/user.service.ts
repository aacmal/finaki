import { Types } from "mongoose";
import { IUser } from "../../types/User";
import User from "../models/User";
import RefreshToken from "../models/RefreshToken";

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

async function getById(userId: string | undefined | Types.ObjectId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

async function pushTransaction(userId: string | undefined | Types.ObjectId, transactionId: Types.ObjectId) {
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

async function pullTransaction(userId: Types.ObjectId, transactionId: Types.ObjectId) {
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

async function pushToken(userId: string | undefined | Types.ObjectId, tokenId: Types.ObjectId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.refreshTokens.push(tokenId);
      await user.save();
    }
  } catch (error) {
    throw error;
  }
}

async function pullToken(userId: string | undefined | Types.ObjectId, tokenId: Types.ObjectId | string) {
  try {
    await User.findByIdAndUpdate(
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

async function pushWallet(userId: Types.ObjectId, walletId: Types.ObjectId) {
  try {
    console.log("pushWallet");

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
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

async function pullWallet(userId: Types.ObjectId, walletId: Types.ObjectId) {
  try {
    await User.findByIdAndUpdate(
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

async function findByRefreshToken(token: string): Promise<IUser | null> {
  try {
    const tokenResult = await RefreshToken.findOne({ token }).populate("userId", { refreshTokens: 0, transactions: 0 });
    return tokenResult?.userId as unknown as IUser;
  } catch (error) {
    throw error;
  }
}

export {
  create,
  getById,
  isUnique,
  pushTransaction,
  pullTransaction,
  pushToken,
  pullToken,
  findByRefreshToken,
  pushWallet,
  pullWallet,
};
