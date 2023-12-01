<template>
    <div class="container-fluid">
        <div class="row">
            <div
                class="bg-primary col-auto d-flex justify-content-between flex-column">
                <div class="p-2">
                    <ul class="nav nav-pills flex-column mt-4">
                        <li class="nav-item py-2 py-sm-0">
                            <router-link
                                @click="selectSidebar"
                                to="/"
                                class="nav-link text-white"
                                aria-current="page">
                                <i class="fs-5 fa fa-gauge"></i>

                                <span class="fs-5 ms-2 d-none d-sm-inline"
                                    >Dashboard
                                </span>
                            </router-link>
                        </li>
                        <li class="nav-item py-2 py-sm-0">
                            <a
                                class="nav-link text-white"
                                style="cursor: pointer"
                                aria-current="page"
                                @click="selectProduct">
                                <i class="fs-5 fa-brands fa-product-hunt"></i
                                ><span class="fs-5 d-none ms-2 d-sm-inline"
                                    >Products</span
                                >
                            </a>
                        </li>
                        <li class="nav-item py-2 py-sm-0">
                            <router-link
                                to="#"
                                @click="selectSidebar"
                                class="nav-link text-white"
                                aria-current="page">
                                <i class="fs-5 fa fa-clipboard"></i
                                ><span class="fs-5 d-none ms-2 d-sm-inline"
                                    >Orders</span
                                >
                            </router-link>
                        </li>
                        <li class="nav-item py-2 py-sm-0">
                            <router-link
                                to="#"
                                @click="selectSidebar"
                                class="nav-link text-white"
                                aria-current="page">
                                <i class="fs-5 fa fa-users"></i
                                ><span class="fs-5 d-none ms-2 d-sm-inline"
                                    >Users</span
                                >
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineProps, ref } from "vue";
export default {
    setup(_, { emit }) {
        const selectProduct = () => {
            emit("show-product");
        };
        const selectSidebar = () => {
            emit("sidebar");
        };
        return {
            selectProduct,
            selectSidebar,
        };
    },
};
</script>

<style lang="css">
@import "../assets/css/sidebar.css";
</style>
