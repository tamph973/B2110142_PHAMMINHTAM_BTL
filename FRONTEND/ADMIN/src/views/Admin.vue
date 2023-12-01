<template>
    <AdminHeader />
    <div class="row">
        <div class="col-lg-2 col-md-3">
            <Sidebar
                @show-product="showProductSection"
                @sidebar="handleSidebarItemClick" />
        </div>

        <div class="col-md-10">
            <div v-if="showWelcome">
                <h2 class="text-center text-success fw-500 me-5">
                    WELCOME TO ADMIN PAGE ! ! !
                </h2>
                <img
                    src="../assets/image/img-page.webp"
                    alt=""
                    class="img-page" />
            </div>
            <!-- Nếu showProduct là true, hiển thị phần quản lý sản phẩm -->
            <div v-if="showProduct">
                <ProductManager />
            </div>
        </div>
    </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductManager from "../components/ProductManager.vue";
import { ref } from "vue";
export default {
    components: {
        Sidebar,
        AdminHeader,
        ProductManager,
    },

    setup() {
        const showProduct = ref(false);
        const showWelcome = ref(true);

        const showProductSection = () => {
            showProduct.value = true;
        };
        const handleSidebarItemClick = () => {
            // Đặt giá trị showWelcome thành false để ẩn phần welcome khi nhấp vào sidebar
            showWelcome.value = false;
        };
        return {
            showProduct,
            showProductSection,
            showWelcome,
            handleSidebarItemClick,
        };
    },
};
</script>

<style>
.img-page {
    margin-left: 300px;
    width: 50%;
}
</style>
