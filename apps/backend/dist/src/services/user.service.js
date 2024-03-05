import TokenModel from "../models/token.model";
import UserModel from "../models/user.model";
export async function isUnique(email) {
    const user = await UserModel.findOne({ email });
    return user?.email === email;
}
export async function create(userData) {
    try {
        const user = new UserModel(userData);
        return await user.save();
    }
    catch (error) {
        throw error;
    }
}
export async function getById(userId) {
    try {
        const user = await UserModel.findById(userId);
        return user;
    }
    catch (error) {
        throw error;
    }
}
export async function pushTransaction(userId, transactionId) {
    try {
        const user = await UserModel.findById(userId);
        if (user) {
            user.transactions.push(transactionId);
            await user.save();
        }
    }
    catch (error) {
        throw error;
    }
}
export async function pullTransaction(userId, transactionId) {
    try {
        await UserModel.findByIdAndUpdate({
            _id: userId,
        }, {
            $pull: {
                transactions: transactionId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
export async function pushToken(userId, tokenId) {
    try {
        const user = await UserModel.findById(userId);
        if (user) {
            user.refreshTokens.push(tokenId);
            await user.save();
        }
    }
    catch (error) {
        throw error;
    }
}
export async function pullToken(userId, tokenId) {
    try {
        await UserModel.findByIdAndUpdate({
            _id: userId,
        }, {
            $pull: {
                refreshTokens: tokenId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
export async function pushWallet(userId, walletId) {
    try {
        await UserModel.findByIdAndUpdate({
            _id: userId,
        }, {
            $push: {
                wallets: {
                    $each: [walletId],
                    $position: 0,
                },
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
export async function pullWallet(userId, walletId) {
    try {
        await UserModel.findByIdAndUpdate({
            _id: userId,
        }, {
            $pull: {
                wallets: walletId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
export async function findByRefreshToken(token) {
    try {
        const tokenResult = await TokenModel.findOne({ token }).populate("userId", {
            refreshTokens: 0,
            transactions: 0,
        });
        return tokenResult?.userId;
    }
    catch (error) {
        throw error;
    }
}
