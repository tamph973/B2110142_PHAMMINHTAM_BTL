import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }

    async createProduct(data) {
        return (await this.api.post("/", data)).data;
    }

    async updateProduct(prodId, data) {
        return (await this.api.put(`/${prodId}`, data)).data;
    }

    async deleteProduct(prodId) {
        return (await this.api.delete(`/${prodId}`)).data;
    }

    async getAllProduct() {
        return (await this.api.get("/")).data;
    }

    async getProduct(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getByName(name) {
        return (await this.api.get("/byname", { params: { name } })).data;
    }
}

export default new ProductService();
