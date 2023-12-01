
<template>
    <div class="page-holder align-items-center py-4 bg-gray-100 vh-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 px-lg-4" v-if="userlogin">
                    <div class="card">
                        <div class="card-header px-lg-5">
                            <div class="card-heading text-primary fs-2 text-uppercase">
                                Login
                            </div>
                        </div>
                        <div class="card-body p-lg-5">
                            <h3 class="mb-4">Hi, welcome back! ??</h3>
                            <p class="text-muted text-sm mb-5">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore.
                            </p>

                            <form id="loginForm">
                                <div class="form-floating mb-3">
                                    <input
                                        class="form-control"
                                        id="floatingInput"
                                        type="email"
                                        placeholder="name@example.com"
                                        required />
                                    <label for="floatingInput"
                                        >Email address</label
                                    >
                                </div>
                                <div class="form-floating mb-3">
                                    <input
                                        class="form-control"
                                        id="floatingPassword"
                                        type="password"
                                        placeholder="Password"
                                        required />
                                    <label for="floatingPassword"
                                        >Password</label
                                    >
                                </div>
                                <div class="form-check mb-3">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="remember"
                                        id="remember" />
                                    <label
                                        class="form-check-label"
                                        for="remember"
                                        >Remember me</label
                                    >
                                </div>
                                <button class="btn btn-primary" type="button">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div class="card-footer px-lg-5 py-lg-4">
                            <div class="text-sm text-muted">
                                Don't have an account?
                                <a @click="user_register()">Register</a>.
                            </div>
                        </div>
                    </div>
                </div>
                <!-- register -->
                <div class="col-lg-6 px-lg-4" v-if="userregister">
                    <div class="card">
                        <div class="card-header px-lg-5">
                            <div class="card-heading text-primary fs-2 text-uppercase">
                                Register
                            </div>
                        </div>
                        <div class="card-body p-lg-5">
                            <h3 class="mb-4">Get started with Jassa</h3>
                            <p class="text-muted text-sm mb-5">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore.
                            </p>
                            <form action="index.html">
                                <div class="form-floating mb-3">
                                    <input
                                        class="form-control"
                                        id="username"
                                        type="email"
                                        placeholder="name@example.com"
                                        required />
                                    <label for="username">Username</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input
                                        class="form-control"
                                        id="floatingInput"
                                        type="email"
                                        placeholder="name@example.com"
                                        required />
                                    <label for="floatingInput"
                                        >Email address</label
                                    >
                                </div>
                                <div class="form-floating mb-3">
                                    <input
                                        class="form-control"
                                        id="floatingPassword"
                                        type="password"
                                        placeholder="Password"
                                        required />
                                    <label for="floatingPassword"
                                        >Password</label
                                    >
                                </div>
                                <div class="form-check mb-3">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="agree"
                                        id="agree" />
                                    <label class="form-check-label" for="agree"
                                        >I agree with the
                                        <a href="#">Terms & Conditions</a
                                        >.</label
                                    >
                                </div>
                                <div class="form-group">
                                    <button
                                        class="btn btn-primary"
                                        id="regidter"
                                        type="button"
                                        name="registerSubmit">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer px-lg-5 py-lg-4">
                            <div class="text-sm text-muted">
                                Already have an account?
                                <a @click="user_login()">Login</a>.
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary">
                    <img
                        class="img-fluid mb-4"
                        width="300"
                        src="https://therichpost.com/wp-content/uploads/2021/06/login_page_image.png"
                        alt=""
                        style="transform: rotate(10deg)" />
                    <h1 class="mb-4">
                        Therichpost.com <br class="d-none d-lg-inline" />free
                        code snippets.
                    </h1>
                    <p class="lead text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        //user login button click event
        user_login() {
            (this.userlogin = true), (this.userregister = false);
        },
        //user register button click event
        user_register() {
            (this.userlogin = false), (this.userregister = true);
        },
    },
    data: function () {
        return {
            userlogin: true,
            userregister: false,
        };
    },
};
</script>

<style scoped>

.card-header:first-child {
    border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
    position: relative;
    padding: 2rem 2rem;
    border-bottom: none;
    background-color: white;
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
    z-index: 2;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: none;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    border-radius: 1rem;
}
.bg-gray-100 {
    background-color: #f8f9fa !important;
}
body {
    font-family: "Poppins" !important;
}
.text-primary {
    color: #4650dd !important;
}
h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
    font-weight: 700;
    line-height: 1.2;
}
.text-muted {
    color: #6c757d !important;
}

.lead {
    font-size: 1.125rem;
    font-weight: 300;
}
.text-sm {
    font-size: 0.7875rem !important;
}
h3,
.h3 {
    font-size: 1.575rem;
}
.page-holder {
    display: flex;
    overflow-x: hidden;
    width: 100%;
    min-height: calc(100vh - 72px);

    flex-wrap: wrap;
}
a {
    color: #4650dd !important;
    text-decoration: underline !important;
    cursor: pointer;
}
</style>
