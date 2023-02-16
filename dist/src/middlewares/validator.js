"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferWalletBalanceValidator = exports.walletColorValidator = exports.updateWalletValidator = exports.walletValidator = exports.signValidator = exports.registerValidator = exports.transactionValidator = void 0;
const express_validator_1 = require("express-validator");
exports.transactionValidator = [
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("note").optional(),
    (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Type is required"),
    (0, express_validator_1.body)("wallet").optional(),
];
exports.registerValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is invalid").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.signValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is invalid").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
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
exports.updateWalletValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("color").notEmpty().withMessage("color is required"),
];
exports.walletColorValidator = [(0, express_validator_1.body)("color").notEmpty().withMessage("Color is required")];
exports.transferWalletBalanceValidator = [
    (0, express_validator_1.body)("sourceWallet").notEmpty().withMessage("Source wallet is required"),
    (0, express_validator_1.body)("destinationWallet").notEmpty().withMessage("Destination wallet is required"),
    (0, express_validator_1.body)("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isNumeric()
        .withMessage("Amount must be a number")
        .isInt({ min: 0 })
        .withMessage("Amount must be greater than 0"),
];
