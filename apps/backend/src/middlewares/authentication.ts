/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * During refactoring to Monorepo, I found this file is so many eslint error
 * I Don't know why, but I think this is because of the typescript version
 * or maybe the eslint version, so for now I will disable some eslint rule
 * and I will fix it later
 */

import { NextFunction, Request, Response } from "express";
import passport from "passport";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate(
    "jwt",
    { session: false },
    (
      error: never,
      userId: Express.User | undefined,
      info: { message: any },
    ) => {
      if (error || !userId) {
        return res.status(401).json({
          message: info.message,
        });
      } else {
        req.user = userId;
        next();
      }
    },
  )(req, res, next);
}
