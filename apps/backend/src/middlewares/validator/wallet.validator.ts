import { body } from "express-validator";

export const walletValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("initialBalance")
    .optional()
    .isNumeric()
    .withMessage("Balance must be a number")
    .isInt({ min: 0 })
    .withMessage("Balance must be greater than 0"),
  body("color").notEmpty().withMessage("Color is required"),
];

export const transferWalletBalanceValidator = [
  body("sourceWallet").notEmpty().withMessage("Source wallet is required"),
  body("destinationWallet")
    .notEmpty()
    .withMessage("Destination wallet is required"),
  body("description").optional(),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .isInt({ min: 0 })
    .withMessage("Amount must be greater than 0"),
];
