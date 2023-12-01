<template>
    <div class="container mb-4">
        <h2 class="text-center mb-4">Cập Nhật Sản Phẩm</h2>
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
                @click="updateProduct">
                Update Product
            </button>
        </div>

        <SuccessMessage
            :show="showSuccessMessage"
            :message="successMessage"
            @close="closeSuccessMessage" />
    </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import ProductService from "../services/product.service";
import SuccessMessage from "@/components/SuccessMessage.vue";
export default {
    components: {
        SuccessMessage,
    },
    setup() {
        const code = ref();
        const categories = ref();
        const name = ref();
        const price = ref();
        const countInStock = ref();
        const date = ref();
        const description = ref();
        const image = ref(null);
        const route = useRoute();
        const id = route.params.id;

        const showSuccessMessage = ref(false);
        const successMessage = ref("");

        onBeforeMount(async () => {
            try {
                const res = await ProductService.getProduct(id);
                code.value = res.code;
                name.value = res.name;
                // Update other properties accordingly
                categories.value = res.categories;
                price.value = res.price;
                countInStock.value = res.countInStock;
                date.value = res.date;
                image.value = res.image;
            } catch (error) {
                console.log(error);
            }
        });

        const updateProduct = async () => {
            try {
                await ProductService.updateProduct(id, {
                    code: code.value,
                    name: name.value,
                    categories: categories.value,
                    price: price.value,
                    countInStock: countInStock.value,
                    date: date.value,
                    description: description.value,
                    image: image.value,
                });

                successMessage.value = "Sản phẩm được cập nhật thành công.";
                showSuccessMessage.value = true;
                // setTimeout(() => {
                //     showSuccessMessage.value = false;
                //     // router.push({ name: "home" });
                // }, 99999);
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
            categories,
            price,
            countInStock,
            date,
            description,
            showSuccessMessage,
            successMessage,
            image,
            updateProduct,
            onImageChange,
            closeSuccessMessage,
        };
    },
};
</script>
