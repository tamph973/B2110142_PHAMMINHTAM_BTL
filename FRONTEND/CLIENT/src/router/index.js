import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomePage.vue"),
        meta: {
            title: "Trang chủ",
        },
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "Đăng nhập",
        },
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: "Đăng ký",
        },
        component: () => import("@/views/Register.vue"),
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
