import database from "../../src/configs/database.config";
import TransactionModel from "../../src/models/transaction.model";
import UserModel from "../../src/models/user.model";
import WalletModel from "../../src/models/wallet.model";
const userId = "640c5fe8e4607df44520b092";
const walletId = "640c9a0c97321cead51393ca";
async function deleteTransactions() {
    await database();
    await TransactionModel.deleteMany({
        userId: userId,
    }).then(() => {
        // eslint-disable-next-line no-console
        console.log("Transactions deleted successfully");
    });
    await UserModel.updateOne({
        _id: userId,
    }, {
        $set: {
            transactions: [],
        },
    });
    await WalletModel.updateOne({
        _id: walletId,
    }, {
        $set: {
            transactions: [],
            balance: 0,
        },
    });
    process.exit(0);
}
await deleteTransactions();
