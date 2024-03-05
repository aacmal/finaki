import TokenModel from "../models/token.model";
import UserModel from "../models/user.model";
import * as UserService from "../services/user.service";
export async function getUser(req, res) {
    try {
        const userId = req.user;
        const user = await UserService.getById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.statusMessage = "User found";
        res.json({
            message: "User has been fetched successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: user.token,
                telegramAccount: {
                    username: user.telegramAccount?.username,
                    firstName: user.telegramAccount?.first_name,
                },
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getLoggedDevices(req, res) {
    try {
        const userId = req.user;
        const cookie = req.cookies.refresh_token;
        const user = await UserModel.findById(userId).populate({
            path: "refreshTokens",
            select: {
                userAgent: 1,
                createdAt: 1,
                token: 1,
                _id: 1,
            },
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refreshToken = user.refreshTokens.map((token) => ({
            _id: token._id,
            userAgent: token.userAgent,
            createdAt: token.createdAt,
            isCurrent: token.token === cookie,
        }));
        res.json({
            message: "Devices has been fetched successfully",
            data: refreshToken,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function logoutDevices(req, res) {
    try {
        const userId = req.user;
        const cookie = req.cookies.refresh_token;
        const currentToken = await TokenModel.findOne({ token: cookie });
        if (!currentToken)
            return res.status(401).json({ message: "Refresh Token not valid" });
        const deviceIds = req.body.deviceIds;
        await UserModel.updateOne({
            _id: userId,
        }, {
            $pull: {
                transactions: {
                    $in: deviceIds,
                },
            },
        });
        await TokenModel.deleteMany({
            _id: {
                $in: deviceIds,
            },
        });
        res.json({
            message: "Devices has been logged out successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function detachTelegramAccount(req, res) {
    try {
        const userId = req.user;
        const user = await UserModel.findByIdAndUpdate(userId, {
            telegramAccount: {
                id: null,
            },
        }, {
            new: true,
        }).select({
            name: 1,
            email: 1,
            telegramAccount: 1,
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({
            message: "Telegram account has been detached successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
