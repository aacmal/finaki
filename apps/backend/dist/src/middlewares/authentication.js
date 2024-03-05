import passport from "passport";
export function isAuthenticated(req, res, next) {
    passport.authenticate("jwt", { session: false }, (error, userId, info) => {
        if (error || !userId) {
            return res.status(401).json({
                message: info.message,
            });
        }
        else {
            req.user = userId;
            next();
        }
    })(req, res, next);
}
