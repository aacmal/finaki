import { body } from "express-validator";

export const transactionValidator = [
  body("description").notEmpty().withMessage("Description is required"),
  body("note").optional(),
  body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number"),
  body("type").notEmpty().withMessage("Type is required"),
  body("wallet").optional(),
];

export const registerValidator = [
  body("email").isEmail().withMessage("Email is invalid").notEmpty().withMessage("Email is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const signValidator = [
  body("email").isEmail().withMessage("Email is invalid").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

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

export const updateWalletValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("color").notEmpty().withMessage("color is required"),
];

export const walletColorValidator = [body("color").notEmpty().withMessage("Color is required")];

export const transferWalletBalanceValidator = [
  body("sourceWallet").notEmpty().withMessage("Source wallet is required"),
  body("destinationWallet").notEmpty().withMessage("Destination wallet is required"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .isInt({ min: 0 })
    .withMessage("Amount must be greater than 0"),
];
