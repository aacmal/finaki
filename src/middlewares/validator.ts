import { body } from "express-validator";

export const transactionValidator = [
  body("description").notEmpty().withMessage("Description is required"),
  body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number"),
  body("type").notEmpty().withMessage("Type is required"),
  body("category").optional(),
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
