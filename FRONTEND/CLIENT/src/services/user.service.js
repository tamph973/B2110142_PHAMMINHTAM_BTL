import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async update(userId, data) {
        return (await this.api.put(`/${userId}`, data)).data;
    }

    async delete(userId) {
        return (await this.api.delete(`/${userId}`)).data;
    }

    async getAllUser() {
        return (await this.api.get("/")).data;
    }

    async getUser(userId, access_token) {
        return (
            await this.api.get(`/${userId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
        ).data;
    }
}

export default new UserService();
