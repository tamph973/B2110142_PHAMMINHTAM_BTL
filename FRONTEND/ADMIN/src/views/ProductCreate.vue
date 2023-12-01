<template>
    <div class="container mb-4">
        <h2 class="text-center mb-4">Thêm Sản Phẩm</h2>
        <div class="form-group col-md-4">
            <label for="code" class="fw-bold">Product code</label>
            <input
                v-model="code"
                type="text"
                class="form-control"
                id="code"
                placeholder="Product code" />
        </div>
        <div class="form-group col-md-4">
            <label for="category" class="fw-bold">Category</label>
            <select class="form-control" v-model="categories">
                <option value="" disabled selected>Type of Products</option>
                <option>PC</option>
                <option>Laptop</option>
                <optgroup label="Accessories">
                    >
                    <option>Headphone</option>
                    <option>Keyboard</option>
                    <option>Mouse</option>
                    <option>RAM</option>
                </optgroup>
            </select>
        </div>

        <div class="form-group col-md-4">
            <label for="name" class="fw-bold">Product name</label>
            <input
                v-model="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Name" />
        </div>
        <!-- <div class="form-group col-md-4">
            <label for="category" class="fw-bold">Brand</label>
            <select class="form-control" id="brand" v-model="brand">
                <option disabled selected>Name of brands</option>
                <option>ACER</option>
                <option>ASUS</option>
                <option>APPLE</option>
                <option>DELL</option>
                <option>HP</option>
                <option>GIGABYTE</option>
                <option>LENOVO</option>
            </select>
        </div> -->

        <div class="form-group col-md-4">
            <label for="price" class="fw-bold">Price</label>
            <input
                v-model="price"
                type="text"
                class="form-control"
                id="price"
                placeholder="Price" />
        </div>
        <div class="form-group col-md-4">
            <label for="desc" class="fw-bold">Description</label>
            <textarea
                v-model="description"
                name="desc"
                id="desc"
                cols="48"
                rows="5"></textarea>
        </div>
        <div class="form-group col-md-4">
            <label for="countInStock" class="fw-bold">Count in stock</label>
            <input
                v-model="countInStock"
                type="number"
                class="form-control"
                id="countInStock"
                placeholder="Count in stock" />
        </div>
        <div class="form-group col-md-4">
            <label for="entry" class="fw-bold">Date of warehousing</label>
            <input
                v-model="date"
                type="date"
                class="form-control"
                id="entry"
                placeholder="Date" />
        </div>

        <div class="form-group col-md-3">
            <label for="image" class="fw-bold">Product image</label>
            <input
                @change="onImageChange"
                type="file"
                class="form-control"
                id="image" />
        </div>

        <div class="text-center">
            <router-link :to="{ name: 'admin' }">
                <button class="btn btn-outline-primary btn-sm">Back</button>
            </router-link>
            <button
                type="button"
                class="btn btn-outline-primary btn-sm ms-4"
                id="add_product"
                @click="addProduct">
                Add Product
            </button>
        </div>
        <SuccessMessage
            :show="showSuccessMessage"
            :message="successMessage"
            @close="closeSuccessMessage" />
    </div>
</template>

<script>
import { ref } from "vue";
import ProductService from "../services/product.service";
import SuccessMessage from "@/components/SuccessMessage.vue";
export default {
    components: {
        SuccessMessage,
    },
    setup() {
        const code = ref();
        const name = ref();
        const categories = ref();
        const brand = ref();
        const price = ref();
        const countInStock = ref();
        const date = ref();
        const description = ref();
        const image = ref("");
        const showSuccessMessage = ref(false);
        const successMessage = ref("");
        const addProduct = async () => {
            try {
                const res = await ProductService.createProduct({
                    code: code.value,
                    name: name.value,
                    categories: categories.value,
                    brand: brand.value,
                    price: price.value,
                    countInStock: countInStock.value,
                    date: date.value,
                    description: description.value,
                    image: image.value,
                });
                successMessage.value = "Sản phẩm được thêm vào thành công.";
                showSuccessMessage.value = true;
                setTimeout(() => {
                    showSuccessMessage.value = false;
                    // router.push({ name: "home" });
                }, 2000);
            } catch (err) {
                console.log(err);
            }
        };

        const closeSuccessMessage = () => {
            showSuccessMessage.value = false; // Ẩn thông báo
        };

        const onImageChange = (event) => {
            const selectedFile = event.target.files[0];
            image.value = URL.createObjectURL(selectedFile);
        };

        return {
            code,
            name,
            categories,
            price,
            countInStock,
            date,
            brand,
            description,

            image,
            showSuccessMessage,
            successMessage,

            addProduct,
            onImageChange,
            closeSuccessMessage,
        };
    },
};
</script>

<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay-content {
    background-color: #4caf50; /* Màu xanh lá cây cho background của overlay-content */
    color: white; /* Màu chữ của overlay-content là trắng */
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}
</style>
