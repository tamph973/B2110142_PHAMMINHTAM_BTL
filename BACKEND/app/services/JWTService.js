const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../api-error");

class JWTService {
    constructor() {
        this.accessToken_expired = "2h";
        this.refreshToken_expired = "365d";
    }
    async generalAccessToken(payload) {
        const access_token = jwt.sign({ ...payload }, config.jwt.access_tk, {
            expiresIn: this.accessToken_expired,
        });

        return access_token;
    }

    async generalRefreshToken(payload) {
        const refresh_token = jwt.sign({ ...payload }, config.jwt.refresh_tk, {
            expiresIn: this.refreshToken_expired,
        });

        return refresh_token;
    }

    async refreshTokenService(token) {
        try {
            const user = jwt.verify(token, config.jwt.refresh_tk);
            const { payload } = user;
            const accessToken = await this.generalAccessToken({
                id: payload._id,
                isAdmin: payload.isAdmin,
            });
            return { accessToken };
        } catch (err) {
            throw new ApiError(403, "Forbidden");
        }
    }
}

module.exports = new JWTService();
