<template>
  <li class="cart__item product">
    <router-link :to="{name: 'product', params: {id: item.productId}}" class="product__pic">
      <img :src="item.product.image.file.url" width="120" height="120" :alt="item.product.title">
    </router-link>
    <router-link :to="{name: 'product', params: {id: item.productId}}" class="product__title">
      {{ item.product.title }}
    </router-link>

    <!-- <p class="product__info">
      Объем: <span>128 GB</span>
    </p> -->

    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <FormCounter class="product__counter" :count.sync="amount" />

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>


<script>
import numberFormat from '@/helpers/numberFormat';
import FormCounter from './FormCounter.vue';

export default {
    props: ['item'],
    computed: {
      amount: {
        get() {
          return this.item.amount;
        },
        set(value) {
          this.$store.dispatch('updateCartProductAmount', {productId: this.item.productId, amount: value});
        },
      },
    },
    methods: {
      deleteProduct(id) {
        this.$store.dispatch('removeCartProduct', id);
      },
    },
    filters: {
      numberFormat,
    },
    components: { FormCounter },
}
</script>


<style>
  button {
    cursor: pointer;
  }

  .product__title {
    color: #222;
    font-weight: 600;
  }
</style>
