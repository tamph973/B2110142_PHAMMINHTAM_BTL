<template>
    <div>
        <h1>Product List</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - {{ product.price }}
            </li>
        </ul>
    </div>
</template>

<script>
import productService from "@/services/product.service";

export default {
    data() {
        return {
            products: [],
        };
    },
    mounted() {
        this.loadProducts();
    },
    methods: {
        async loadProducts() {
            try {
                const response = await productService.getAllProduct();
                this.products = response.data;
            } catch (error) {
                console.error("Error loading products:", error);
            }
        },
    },
};
</script>
