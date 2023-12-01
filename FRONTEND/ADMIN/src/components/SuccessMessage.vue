<template>
    <div v-if="show" class="success-message-overlay">
        <div
            class="success-message d-flex flex-column justify-content-center align-items-center">
            <div
                class="d-flex justify-content-center align-items-center fs-5 fw-bold">
                <p class="text-center text-success">{{ message }}</p>
            </div>
            <img src="../assets/image/icons/iconcheck.png" alt="" width="50" />
            
            <div>
                <button class="btn btn-primary mt-5" @click="closeMessage">
                    <span>Xác nhận</span>
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
    },
};
</script>

<style scoped>
/* CSS để tạo giao diện của thông báo thành công */
.success-message-overlay {
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

.success-message {
    background: white;
    width: 300px;
    height: 50%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
