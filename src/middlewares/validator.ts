import { body } from "express-validator";

export const transactionValidator = [
  body("description").notEmpty().withMessage("Description is required"),
  body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number"),
  body("type").notEmpty().withMessage("Type is required"),
  body("category").optional(),
];
