"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferWalletBalanceValidator = exports.walletValidator = void 0;
const express_validator_1 = require("express-validator");
exports.walletValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("initialBalance")
        .optional()
        .isNumeric()
        .withMessage("Balance must be a number")
        .isInt({ min: 0 })
        .withMessage("Balance must be greater than 0"),
    (0, express_validator_1.body)("color").notEmpty().withMessage("Color is required"),
];
exports.transferWalletBalanceValidator = [
    (0, express_validator_1.body)("sourceWallet").notEmpty().withMessage("Source wallet is required"),
    (0, express_validator_1.body)("destinationWallet").notEmpty().withMessage("Destination wallet is required"),
    (0, express_validator_1.body)("description").optional(),
    (0, express_validator_1.body)("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isNumeric()
        .withMessage("Amount must be a number")
        .isInt({ min: 0 })
        .withMessage("Amount must be greater than 0"),
];
