const jwt = require("jsonwebtoken");
const config = require("../config");

const handleForbidden = (res) => {
    return res.status(403).json({ message: "You are not alowed to do that" });
};

const verifyToken = (req, res, next) => {
    const authorToken = req.headers["authorization"];
    const token = authorToken ? authorToken.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    jwt.verify(token, config.jwt.access_tk, (err, user) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Token is invalid or expired" });
        }
        req.user = user;
        next();
    });
};

const authMiddleware = (req, res, next) => {
    verifyToken(req, res, () => {
        const { payload } = req.user;
        if (payload.isAdmin) {
            next();
        } else {
            handleForbidden(res);
        }
    });
};

module.exports = { authMiddleware, verifyToken };
