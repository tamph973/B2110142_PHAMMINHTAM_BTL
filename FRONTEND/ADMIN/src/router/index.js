import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "admin",
        meta: {
            title: "Trang quản trị",
        },
        component: () => import("@/views/Admin.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "Đăng nhập admin",
        },
        component: () => import("@/views/AdminLogin.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: "Đăng ký",
        },
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/product/create",
        name: "create-product",
        meta: {
            title: "Thêm sản phẩm",
        },
        component: () => import("../views/ProductCreate.vue"),
    },
    {
        path: "/product/update/:id",
        name: "update-product",
        meta: {
            title: "Cập nhật sản phẩm",
        },
        component: () => import("../views/ProductUpdate.vue"),
    },
    {
        path: "/admin/product",
        name: "product",
        meta: {
            title: "Quản lý sản phẩm",
        },
        component: () => import("../components/ProductManager.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    document.title = to.meta.title;
});
export default router;
