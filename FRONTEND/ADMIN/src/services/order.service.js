import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    async createOrder(userId, data) {
        return (await this.api.post(`/${userId}`, data)).data;
    }

    async updateStatus(orderId, data) {
        return (await this.api.put(`/status/${orderId}`, data)).data;
    }

    async getUserOrder(userId) {
        return (await this.api.post(`/${userId}`)).data;
    }

    async deleteOrder(orderId) {
        return (await this.api.delete(`/${orderId}`)).data;
    }
}

export default new OrderService();
