const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tech-store",
    },
    jwt: {
        access_tk: process.env.ACCESS_TOKEN || "access_token",
        refresh_tk: process.env.REFRESH_TOKEN || "refresh_token",
    },
};

module.exports = config;
    