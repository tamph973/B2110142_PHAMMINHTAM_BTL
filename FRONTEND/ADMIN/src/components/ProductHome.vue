<template>
    <div class="app">
        <div class="grid wide">
            <div class="row product">
                <div class="col-lg-3">
                    <nav class="category">
                        <div class="category-title">
                            <span>Danh mục sản phẩm</span>
                        </div>

                        <div class="category-list">
                            <ul class="tree-menu">
                                <li class="tree-menu-main">
                                    <a href="" class="tree-menu-link"
                                        >PC - Chơi game</a
                                    >
                                </li>
                                <li class="tree-menu-main">
                                    <a href="" class="tree-menu-link"
                                        >PC -Làm việc</a
                                    >
                                </li>
                                <li class="tree-menu-main">
                                    <a href="" class="tree-menu-link">Laptop</a>
                                </li>
                                <li class="tree-menu-main has-child">
                                    <a href="" class="tree-menu-link">
                                        <span>Phụ kiện</span>
                                    </a>
                                    <ul class="tree-menu-sub">
                                        <li>
                                            <a href="" class="tree-menu-link"
                                                >Bàn phím</a
                                            >
                                        </li>
                                        <li>
                                            <a href="" class="tree-menu-link"
                                                >Chuột</a
                                            >
                                        </li>
                                        <li>
                                            <a href="" class="tree-menu-link"
                                                >Tai nghe</a
                                            >
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div class="col-lg-9 col-md-12 col-12">
                    <div class="wrapper-product">
                        <div class="row">
                            <div class="col-lg-12">
                                <section
                                    v-for="(item, index) in productHome"
                                    :key="index">
                                    <div class="product-item">
                                        <div
                                            class="product-image"
                                            v-for="(item, index) in item.brand"
                                            :key="index">
                                            <img
                                                :src="item.dirImg"
                                                alt="img-logo"
                                                :width="250" />
                                        </div>
                                        <div class="product-detail">123</div>
                                    </div>
                                </section>
                            </div>
                            <div class="col-lg-9">
                                <SliderProduct
                                    v-for="(item, index) in productHome"
                                    :key="index"
                                    :dataSlider="item.dataSlider" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from "@/services/product.service";
import SliderProduct from "@/components/SliderProduct.vue";
export default {
    name: "ProductHome",
    components: {
        SliderProduct,
    },
    setup() {
        const productHome = [
            {
                className: "pc",
                title: "PC",
                brand: [
                    {
                        dirImg: "src/assets/image/products/img1.webp",
                        url: { type: "pc", name: "asus" },
                    },
                ],
                dataSlider: [
                    {
                        dirImg: "src/assets/image/products/img1.webp",
                        name: ".",
                        price: 0,
                        type: "pc",
                        nameUrl: "asus",
                    },
                    {
                        dirImg: "src/assets/image/products/img2.webp",
                        name: ".",
                        price: 0,
                        type: "pc",
                        nameUrl: "asus",
                    },
                    {
                        dirImg: "src/assets/image/products/img2.webp",
                        name: ".",
                        price: 0,
                        type: "pc",
                        nameUrl: "asus",
                    },
                    {
                        dirImg: "src/assets/image/products/img2.webp",
                        name: ".",
                        price: 0,
                        type: "pc",
                        nameUrl: "asus",
                    },
                    {
                        dirImg: "src/assets/image/products/img2.webp",
                        name: ".",
                        price: 0,
                        type: "pc",
                        nameUrl: "asus",
                    },
                ],
            },
        ];

        return {
            productHome,
        };
    },
};
</script>

<style>
@import "../assets/css/grid.css";

.app {
    background-color: #f5f5f5;
}

.product {
    padding-top: 32px;
}
.category {
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.08);
    background-color: white;
    margin-bottom: 16px;
}
.category-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    color: #252a2b;
    font-size: 1.2rem;
    cursor: pointer;
    border-bottom: 1px solid #eae4e8;
}
.category-title i {
    color: #2b2525;
    font-size: 1rem;
    padding: 4px;
}
.category-list {
    padding: 10px;
    background-color: #fff;
}
.tree-menu {
    padding: 0;
    margin: 0;
    list-style: none;
}
.tree-menu-main {
    font-size: 1rem;
    font-weight: 500;
}

.tree-menu-link {
    text-decoration: none;
    padding: 5px 10px;
    display: block;
    outline: none;
    color: #252a2b;
}
.tree-menu-sub {
    display: none;
    margin: 0;
    list-style: none;
    padding-left: 16px;
    font-weight: 400;
}
.has-child:hover .tree-menu-sub {
    display: block;
}
</style>
