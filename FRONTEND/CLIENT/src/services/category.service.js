import createApiClient from "./api.service";

class CategoryService {
    constructor(baseUrl = "/api/categories") {
        this.api = createApiClient(baseUrl);
    }

    async createCategory(data) {
        return (await this.api.post("/", data)).data;
    }

    async updateCategory(cateId, data) {
        return (await this.api.put(`/${cateId}`, data)).data;
    }

    async getCategory(cateId) {
        return (await this.api.get(`/${cateId}`)).data;
    }

    async getAllCategory() {
        return (await this.api.get("/")).data;
    }
}

export default new CategoryService();
