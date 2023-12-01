<template>
    <header class="header">
        <div class="grid wide">
            <div class="wrapper-admin-header">
                <a class="navbar-brand brand-logo" href="/">
                    <img
                        src="../assets/image/logo/MTSTORE.png"
                        alt="logo"
                        width="80" />
                </a>

                <div class="wrapper-text-header">
                    <span class="text-admin-header">ADMIN PAGE</span>
                </div>

                <button
                    class="btn btn-link"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <img
                        src="../assets/image/logo/IMG_20201125_180710.jpg"
                        alt="..."
                        width="50"
                        class="mr-3 rounded-circle img-thumbnail shadow-sm" />
                </button>

                <div
                    class="offcanvas offcanvas-end w-25 bg-secondary"
                    ref="offcanvas"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">
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
                                    to="/"
                                    class="text-decoration-none text-white">
                                    <i class="fa fa-gear fs-5 me-2"></i>
                                    <span class="fw-bold">Profile</span>
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
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style>
@import "../assets/css/grid.css";
.header {
    height: 100%;
    background: #005b41;
    background-image: linear-gradient(0, #0f0f0f, #232d3f, #005b41, #008170);
}

.wrapper-admin-header {
    display: flex;
    justify-content: space-between;
}

.wrapper-text-header {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
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
