<template>
    <header class="header">
        <div class="grid wide">
            <nav class="navbar">
                <ul class="navbar-list">
                    <li class="navbar-item navbar-item--separate">
                        <span>Tải ứng dụng</span>
                        <!-- <div class="navbar-qrcode">
                            <img
                                src="./assets/img/qr_code.png"
                                alt="QR"
                                class="qr-img" />
                            <div class="navbar-qrapps">
                                <a href="" class="qrcode-download-link">
                                    <img
                                        src="./assets/img/appstore.png"
                                        alt=""
                                        class="download-img" />
                                </a>
                                <a href="" class="qrcode-download-link">
                                    <img
                                        src="./assets/img/ch_play.png"
                                        alt=""
                                        class="download-img" />
                                </a>
                            </div>
                        </div> -->
                    </li>

                    <li class="navbar-item">
                        <span class="no-pointer__no-hover">Kết nối</span>
                        <a href="" class="navbar-link">
                            <i class="navbar-icon fa-brands fa-facebook"> </i>
                        </a>
                        <a href="" class="navbar-link">
                            <i class="navbar-icon fa-brands fa-instagram"></i>
                        </a>
                        <a href="" class="navbar-link">
                            <i class="navbar-icon fa-brands fa-youtube"></i>
                        </a>
                    </li>
                </ul>

                <ul class="navbar-list">
                    <li class="navbar-item notify-has">
                        <a href="#" class="navbar-link">
                            <i class="navbar-icon fa-solid fa-bell"></i>
                            Thông báo
                        </a>
                    </li>

                    <li class="navbar-item navbar-item--separate">
                        <router-link
                            :to="{ name: 'register' }"
                            class="nav-link">
                            Đăng ký
                        </router-link>
                    </li>
                    <li class="navbar-item">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            Đăng nhập
                        </router-link>
                    </li>
                </ul>

                <!-- <button
                        class="btn btn-link nav-link me-3"
                        @click="toggleOffcanvas">
                        <img
                            src="../assets/image/logo/IMG_20201125_180710.jpg"
                            alt="..."
                            width="50"
                            class="mr-3 rounded-circle img-thumbnail shadow-sm" />
                </button> -->

                <!-- <div
                        class="offcanvas offcanvas-end w-25 bg-secondary"
                        ref="offcanvas"
                        aria-labelledby="offcanvasLabel">
                        <div class="offcanvas-header">
                            <h5
                                id="offcanvasLabel"
                                class="fw-bold text-uppercase text-white">
                                Admin
                            </h5>
                            <button
                                type="button"
                                class="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                                @click="closeOffcanvas"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="list-group">
                                <li class="list-group-item border border-dark">
                                    <router-link
                                        :to="{ name: 'admin' }"
                                        class="text-decoration-none text-white">
                                        <i class="fa fa-gear fs-5 me-2"></i>
                                        <span class="fw-bold">Management</span>
                                    </router-link>
                                </li>

                                <li class="list-group-item mt-2 border border-dark">
                                    <a
                                        href="#!"
                                        class="text-decoration-none text-white fw-bold">
                                        <router-link
                                            class="nav-link"
                                            :to="{ name: 'login' }">
                                            <i
                                                class="fa-solid fa-arrow-right-from-bracket me-2">
                                            </i
                                            >Logout
                                        </router-link>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> -->
            </nav>

            <div class="header-with-search">
                <div class="navbar-brand-wrapper d-flex">
                    <a class="navbar-brand brand-logo" href="/">
                        <img
                            src="../assets/image/logo/MTSTORE.png"
                            alt="logo"
                            width="80" />
                    </a>
                </div>

                <!-- <div class="header-cate">
                    <div class="cate-icon">
                        <i class="fa fa-bars"></i>
                    </div>
                    <span>Danh mục</span>
                </div> -->

                <div class="header__search">
                    <input
                        type="text"
                        class="header__search-input"
                        name="search"
                        id="search"
                        placeholder="Bạn cần tìm gì?" />
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                </div>
                <div class="header__hotline">
                    <a href="tel:0977490021" class="hotline-link">
                        <div class="hotline-icon">
                            <i class="fa fa-phone"></i>
                        </div>
                        <div class="hotline-text">
                            <span>Hotline</span>
                            <span>0977.490.021</span>
                        </div>
                    </a>
                </div>
                <div class="header__cart">
                    <a href="" class="cart-link">
                        <div class="cart-icon">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div class="cart-text">
                            <span>Giỏ hàng</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { ref } from "vue";
import bootstrap from "bootstrap/dist/js/bootstrap.js";

export default {
    setup() {
        const user = {};
        const userLocal = ref({
            name: "",
            email: "",
            password: "",
            access_token: "",
        });

        const toggleOffcanvas = () => {
            const offcanvas = new bootstrap.Offcanvas(this.$refs.offcanvas);
            offcanvas.toggle();
        };
        const closeOffcanvas = () => {
            const offcanvas = new bootstrap.Offcanvas(this.$refs.offcanvas);
            offcanvas.hide();
        };

        return {
            userLocal,
            user,
            toggleOffcanvas,
            closeOffcanvas,
        };
    },
};
</script>

<style>
@import "../assets/css/grid.css";
.header {
    height: 120px;
    background: #005b41;
    background-image: linear-gradient(0, #0f0f0f, #232d3f, #005b41, #008170);
}

.navbar {
    display: flex;
    justify-content: space-between;
    padding: 0;
}

.navbar-list {
    display: flex;
    list-style: none;
    padding-left: 0;
    margin: 4px 0;
    color: white;
}
.navbar-item {
    margin-left: 6px;
    margin-right: 6px;
    position: relative;
    cursor: pointer;
}
.navbar-item--separate::after {
    content: "";
    position: absolute;
    display: block;
    border-left: 1px solid #fff;
    height: 16px;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
}
.navbar-link {
    color: white;
    font-size: 1rem;
    margin-left: 6px;
    margin-right: 6px;
    text-decoration: none;
}
.header-with-search {
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: space-between;
}
.header__search {
    margin: 0px 25px;
    height: 40px;
    width: 50%;
    background-color: white;
    border-radius: 25px;
    display: flex;

    align-items: center;
}
.header__search-input {
    margin-left: 15px;
    width: 100%;
    border: none;
    font-size: 1rem;
    outline: none;
    margin-right: 5px;
    font-weight: 500;
}
.search-icon {
    font-size: 1rem;
    margin-right: 10px;
    padding: 6px;
    border-radius: 50%;
    background: #005b41;
    color: white;
    cursor: pointer;
}

.header__hotline {
    width: 150px;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 8px;
}

.header__hotline:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.hotline-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
}
.hotline-icon {
    font-size: 1.2rem;
    margin: 0 16px 0 4px;
}
.hotline-text {
    display: flex;
    flex-wrap: wrap;
}

.hotline-text--tel {
    display: block;
}
.header__cart {
    width: 100px;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 8px;
}

.header__cart:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.cart-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
}
.cart-icon {
    font-size: 1.2rem;
    margin: 0 16px 0 4px;
}
.cart-text {
    width: 60px;
    display: flex;
    flex-wrap: wrap;
}
.header-cate {
    display: flex;
    align-items: center;
    width: 100px;
    height: 42px;
    color: white;
    font-size: 1rem;
    background-color: #008170;
    border-radius: 4px;
}

.cate-icon {
    margin-right: 4px;
    padding: 4px;
}

/* Thay đổi màu nền của các mục trong menu */
.list-group-item {
    background-color: transparent; /* Màu nền trong suốt */
}

/* Tùy chỉnh màu chữ và đường viền khi hover chuột trên mục menu */
.list-group-item:hover {
    background-color: rgb(127, 255, 182); /* Màu nền khi hover */
}
</style>
