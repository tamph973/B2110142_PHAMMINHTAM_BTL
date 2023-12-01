<template>
    <div v-if="show" class="danger-message-overlay">
        <div
            class="danger-message d-flex flex-column justify-content-center align-items-center">
            <div
                class="d-flex justify-content-center align-items-center fs-5 fw-bold">
                <p class="text-center text-danger">{{ message }}</p>
            </div>
            <img src="../assets/image/icons/warning.png" alt="" width="50" />
            <div class="d-flex">
                <button class="btn-danger btn mt-5" @click="deleted">
                    <span>Xóa bỏ</span>
                </button>
                <button class="btn btn-primary mt-5 ms-5" @click="closeMessage">
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["show", "message"],
    methods: {
        closeMessage() {
            this.$emit("close");
        },
        deleted() {
            this.$emit("deleted");
        },
    },
};
</script>

<style scoped>
/* CSS để tạo giao diện của thông báo thành công */
.danger-message-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000b3;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.danger-message {
    background: white;
    width: 500px;
    height: 30%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

button {
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
