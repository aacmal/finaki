import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as User from "../services/user.service";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function createUser(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { email, password } = req.body;
    if (await User.isUnique(email)) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = await User.create({ email, password });
    res.json({
      message: "User has been created successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

async function login(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  passport.authenticate("local", { session: false }, (error, user, info) => {
    try {
      if (error || !user) {
        return res.status(400).json({
          message: info.message,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }

        const body = { _id: user._id, email: user.email };
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = jwt.sign({ user: body }, JWT_SECRET!, { expiresIn: "7d" });
        return res.json({
          message: "Logged in successfully",
          data: {
            user: {
              id: user._id,
              email: user.email,
            },
            token: `Bearer ${token}`,
          },
        });
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  })(req, res);
}

// TODO: Add logout function

export { createUser, login };
