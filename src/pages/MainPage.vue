<template>

  <main class="content container">

  <div class="content__top content__top--catalog">

    <h1 class="content__title">
      Каталог
    </h1>

    <span class="content__info">
      {{ countProducts }} товаров
    </span>

  </div>

  <div class="content__catalog">

    <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :filter-color.sync="filterColor" :page.sync="page"/>

    <section class="catalog">

      <div class="loader__flex-spec" v-if="products.length < 1">
        <span>Товаров с такими параметрами нет</span>
      </div>

      <div class="loader__flex-spec" v-if="productsLoading">
        <span>Загрузка</span>
        <img src="https://shop.marideco.ru/bitrix/templates/newshop/img/lazyimg-loader.gif" alt="">
      </div>

      <div class="loader__flex" v-if="productsLoadingFailed">
        <span>Произошла ошибка при загрузке товаров...</span>
        <button class="button--primery spec" @click.prevent="loadProducts">Попробовать ещё раз</button>
      </div>

      <ProductList v-else-if="!productsLoading" :products="products"/>

      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>

    </section>

  </div>

  </main>

</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: +this.$route.params.id || 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 6,
      productsData: null,
      productsLoading: true,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
      ? this.productsData.items.map((product) => {
        return {
          ...product,
          image: product.image.file.url,
        }
      })
      : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
        .get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          }
        })
        .then(res => this.productsData = res.data)
        .catch(() => this.productsLoadingFailed = true)
        .then(() => this.productsLoading = false);
      }, 0);
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>


<style>
.loader__flex {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.loader__flex span {
  font-family: "PressStart";
  font-size: 15px;
  padding-bottom: 10px;
}

.loader__flex-spec {
  display: flex;
  align-items: center;
  font-family: "PressStart";
  font-size: 25px;
  line-height: 35px;
}

.loader__flex-spec img {
  max-width: 30px;
  margin-left: 10px;
}

.button--primery.spec:hover {
  background-color: #222;
  border-color: #222;
}
</style>
