import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl);
    }

    async createCart(userId, data) {
        return (await this.api.post(`/${userId}`, data)).data;
    }

    async updateCart(cartId, data) {
        return (await this.api.put(`/${cartId}`, data)).data;
    }

    async addInCart(cartId, data) {
        return (await this.api.post(`/add/${cartId}`, data)).data;
    }

    async emptyCart(cartId) {
        return (await this.api.delete(`/empty/${cartId}`)).data;
    }

    async deleteCart(cartId) {
        return (await this.api.delete(`/${cartId}`)).data;
    }

    async getUserCart(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }
    async getAllCart() {
        return (await this.api.get("/")).data;
    }
}

export default new CartService();
