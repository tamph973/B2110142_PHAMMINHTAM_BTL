<template>
    <AdminHeader />
    <div class="page-holder align-items-center py-4 bg-gray-100 vh-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 px-lg-4">
                    <div class="card">
                        <div class="card-header px-lg-5">
                            <div
                                class="card-heading text-primary fs-2 text-uppercase">
                                Login Admin
                            </div>
                        </div>
                        <div class="card-body p-lg-5">
                            <!-- <h3 class="mb-4">Hi, welcome back! ??</h3>
                            <p class="text-muted text-sm mb-5">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore.
                            </p> -->
                            <Form :validation-schema="FormSchema">
                                <div class="form-floating mb-3">
                                    <Field
                                        v-model="userLocal.email"
                                        class="form-control"
                                        id="floatingEmail"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email..."
                                        required
                                        @input="validateField('email')" />

                                    <label for="floatingEmail">Email</label>
                                    <ErrorMessage
                                        class="error-feedback"
                                        name="email" />
                                </div>
                                <div
                                    class="form-floating mb-3"
                                    id="floatingPasswordWrapper">
                                    <Field
                                        v-model="userLocal.password"
                                        class="form-control"
                                        id="floatingPassword"
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                        name="password"
                                        placeholder="Enter password..."
                                        required
                                        @input="validateField('password')" />
                                    <span
                                        @click="togglePasswordVisibility"
                                        id="iconHidden">
                                        <!-- Thêm biểu tượng để ẩn/hiện mật khẩu -->
                                        {{ showPassword ? "🙈" : "👁️" }}
                                    </span>
                                    <label for="floatingPassword"
                                        >Password</label
                                    >
                                    <ErrorMessage
                                        class="error-feedback"
                                        name="password" />
                                </div>

                                <div class="form-check mb-3 d-flex">
                                    <div>
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            name="remember"
                                            id="remember" />
                                        <label
                                            class="form-check-label"
                                            for="remember"
                                            >Remember me
                                        </label>
                                    </div>

                                    <a class="nav-link d-block ms-auto">
                                        <span>Forgot password?</span>
                                    </a>
                                </div>

                                <button
                                    @click="LoginUser(userLocal)"
                                    class="btn btn-primary"
                                    type="button">
                                    Login
                                </button>

                                <SuccessMessage
                                    :show="showSuccessMessage"
                                    :message="successMessage"
                                    @close="closeSuccessMessage" />
                            </Form>
                        </div>
                        <div class="card-footer px-lg-5 py-lg-4">
                            <div class="text-sm text-muted d-flex">
                                Don't have an account?
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'register' }"
                                    >Register</router-link
                                >
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
                    <h1 class="mb-4 fs-2">
                        WELCOME TO LOGIN ADMIN!
                       
                    </h1>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import UserService from "@/services/user.service";
import * as yup from "yup";
import { ref } from "vue";
import router from "@/router";
import { jwtDecode } from "jwt-decode";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        AdminHeader,
        Form,
        Field,
        ErrorMessage,
        SuccessMessage,
    },
    setup() {
        const user = {};
        const userLocal = ref({
            name: "",
            email: "",
            password: "",
            access_token: "",
        });
        const errors = ref({
            email: "",
            password: "",
        });
        const showSuccessMessage = ref(false);
        const successMessage = ref("");

        const FormSchema = yup.object().shape({
            email: yup
                .string()
                .required("E-mail là bắt buộc.")
                .email("E-mail không đúng.")
                .max(50, "E-mail có tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu là bắt buộc.")
                .min(8, "Mật khẩu phải có tối thiểu 8 ký tự.")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    "Mật khẩu phải bao gồm ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số và một ký tự đặc biệt."
                )
                .notOneOf(
                    [yup.ref("email"), null],
                    "Mật khẩu không được giống với email."
                ),
        });

        const validateField = (fieldName) => {
            // Sử dụng Yup để kiểm tra trường dữ liệu cụ thể
            const fieldSchema = FormSchema.fields[fieldName];
            fieldSchema
                .validate(userLocal[fieldName])
                .then(() => {
                    // Trường hợp hợp lệ: Xóa thông báo lỗi (nếu có)
                    errors.value[fieldName] = "";
                })
                .catch((error) => {
                    // Trường hợp không hợp lệ: Hiển thị thông báo lỗi
                    errors.value[fieldName] = error.message;
                });
        };

        const LoginUser = async (data) => {
            try {
                const respone = await UserService.login(data);
                const accessToken = respone.newRespone?.access_token;
                localStorage.setItem("access_token", accessToken);
                if (accessToken) {
                    const decoded = jwtDecode(accessToken);
                    if (decoded?.id) {
                        getUser(decoded?.id, accessToken);
                    }
                }
                successMessage.value = "ĐĂNG NHẬP THÀNH CÔNG.";
                showSuccessMessage.value = true;
                setTimeout(() => {
                    showSuccessMessage.value = false;
                    router.push({ name: "admin" });
                }, 2000);
            } catch (err) {
                console.log(err);
            }
        };

        const getUser = async (id, token) => {
            const user = await UserService.getUser(id, token);
            // updateUser({ ...user, access_token: token });
        };

        // const updateUser = (userLocal, action) => {
        //     const { name, email, access_token } = action.payload;

        //     // Kiểm tra và cập nhật các trường
        //     userLocal.name = name;
        //     userLocal.email = email;
        //     userLocal.access_token = access_token;

        // };
        const closeSuccessMessage = () => {
            showSuccessMessage.value = false; // Ẩn thông báo
        };

        const showPassword = ref(false);

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        return {
            userLocal,
            errors,
            FormSchema,
            user,
            successMessage,
            showSuccessMessage,
            showPassword,
            togglePasswordVisibility,
            closeSuccessMessage,
            LoginUser,
            validateField,
        };
    },
};
</script>
<style scoped>
#floatingPasswordWrapper {
    position: relative;
}

#iconHidden {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 15px; /* Điều chỉnh vị trí phù hợp */
    transform: translateY(-50%);
    display: flex;
    align-items: center;
}
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

.error-feedback {
    color: red;
}

.success-message {
    margin-top: 10px;
    color: green;
}
</style>
