import { NextFunction, Request, Response } from "express";
import passport from "passport";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        message: info.message,
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}
