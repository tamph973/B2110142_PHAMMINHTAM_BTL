<template>
    <div class="product-manager">
        <div class="text-center mt-2 mb-3">
            <h4 class="text-prod-manager">Product Management</h4>
        </div>

        <div class="container">
            <div>
                <router-link :to="{ name: 'create-product' }">
                    <button class="btn btn-primary">
                        <i class="fa fa-plus"></i>
                        Thêm sản phẩm
                    </button>
                </router-link>
            </div>
            <div class="d-flex offset-8 col-md-4 mb-5">
                <input
                    v-model="searchInput"
                    type="text"
                    name="search"
                    class="search"
                    placeholder="Search products..." />
                <i
                    @click="handleSearch"
                    class="fa-solid fa-magnifying-glass fs-4"
                    style="cursor: pointer"></i>
            </div>

            <table class="table table-bordered text-center">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Product code</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">In Stock</th>
                        <th scope="col">Entry</th>
                        <th scope="col">Functions</th>
                    </tr>
                </thead>
                <tbody v-if="product">
                    <tr v-for="(item, i) in product" :key="i">
                        <th scope="row">{{ item.code }}</th>
                        <td>
                            <img
                                v-if="item.image"
                                :src="item.image"
                                alt=""
                                width="120"
                                height="80" />
                        </td>
                        <td class="truncate-text">{{ item.name }}</td>
                        <td>{{ item.categories }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.countInStock }}</td>
                        <td>{{ formatDate(item.date) }}</td>
                        <td>
                            <router-link
                                :to="{
                                    name: 'update-product',
                                    params: { id: item._id, product: item },
                                }"
                                ><button class="btn">
                                    <i class="fas fa-edit text-info"></i>
                                </button>
                            </router-link>
                            <button class="btn" @click="handleDelete(item._id)">
                                <i class="fas fa-trash-alt text-danger"></i>
                            </button>
                            <button
                                class="btn"
                                @click="
                                    handleShowDescription(item.description)
                                ">
                                <i class="fas fa-info-circle text-success"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <DangerMessage
                :show="showDangerMessage"
                :message="dangerMessage"
                @close="closeDangerMessage"
                @deleted="confirmDelete" />

            <div v-if="showDescriptionModal" class="overlay">
                <div class="overlay-content">
                    <p>{{ selectedProductDescription }}</p>
                    <button
                        class="btn btn-primary"
                        @click="handleCloseDescription">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount, watch } from "vue";
import { format } from "date-fns";
import ProductService from "@/services/product.service";
import DangerMessage from "@/components/DangerMessage.vue";
export default {
    components: {
        DangerMessage,
    },
    setup() {
        const product = ref();
        const name = ref();
        const showDangerMessage = ref(false);
        const dangerMessage = ref("");
        const dangerProductId = ref(null);
        const searchInput = ref("");
        onBeforeMount(async () => {
            try {
                product.value = await ProductService.getAllProduct();
            } catch (err) {
                console.log(err);
            }
        });
        const handleDelete = (id) => {
            dangerProductId.value = id;
            showDangerMessage.value = true;
            dangerMessage.value = "Bạn có chắc chắn muốn xóa sản phẩm này?";
        };

        const confirmDelete = async () => {
            const id = dangerProductId.value;

            showDangerMessage.value = false;

            const index = product.value.findIndex((pd) => pd._id == id);
            await ProductService.deleteProduct(id);
            product.value.splice(index, 1);
        };

        const closeDangerMessage = () => {
            // Close DangerMessage
            showDangerMessage.value = false;
        };
        const formatDate = (dateString) => {
            // Chuyển đổi chuỗi ngày từ cơ sở dữ liệu thành đối tượng ngày
            const date = new Date(dateString);
            // Sử dụng date-fns để định dạng ngày
            return format(date, "dd-MM-yyyy");
        };

        const showDescriptionModal = ref(false);
        const selectedProductDescription = ref("");

        const handleShowDescription = (description) => {
            selectedProductDescription.value = description;
            showDescriptionModal.value = true;
        };

        const handleCloseDescription = () => {
            showDescriptionModal.value = false;
        };

        // Inside setup() function
        const handleSearch = async () => {
            if (name.value) {
                product.value = await ProductService.getByName(name.value);
            } else {
                product.value = await ProductService.getAllProduct();
            }
        };
        
        watch(searchInput, () => {
            handleSearch();
        });
        return {
            product,
            name,
            showDangerMessage,
            dangerMessage,
            dangerProductId,
            formatDate,
            handleDelete,
            closeDangerMessage,
            confirmDelete,
            handleSearch,
            searchInput,
            showDescriptionModal,
            selectedProductDescription,
            handleShowDescription,
            handleCloseDescription,
            
        };
    },
};
</script>
<style scoped>
.search {
    width: 100%;
    border: none;
    border-bottom: 1px solid springgreen;
    outline: none;
}

.truncate-text {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000b3;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.overlay-content {
    /* ... (existing overlay content styles) */
    background-color: #4caf50; /* Màu xanh lá cây cho background của overlay-content */
    color: white; /* Màu chữ của overlay-content là trắng */
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 400px;
    height: 50%;
}

.text-prod-manager {
    margin-right: 210px;
}
</style>
