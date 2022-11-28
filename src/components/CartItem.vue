<template>
  <li class="cart__item product">
    <router-link :to="{name: 'product', params: {id: item.productId}}" class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </router-link>
    <router-link :to="{name: 'product', params: {id: item.productId}}" class="product__title">
      {{ item.product.title }}
    </router-link>

    <!-- <p class="product__info">
      Объем: <span>128 GB</span>
    </p> -->

    <router-link :to="{name: 'main', params: {id: item.product.categoryId}}" class="product__code">
      Артикул: {{ item.product.id }}
    </router-link>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="dec(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="inc">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

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
import { mapMutations } from 'vuex';

export default {
    props: ['item'],
    computed: {
      amount: {
        get() {
          return this.item.amount;
        },
        set(value) {
          this.$store.commit('updateCardProductAmount', {productId: this.item.productId, amount: value});
        },
      },
    },
    methods: {
      ...mapMutations({deleteProduct: 'deleteCartProduct'}),
      inc() {
        this.amount++;
      },
      dec(value) {
        if(this.amount > 1) {
          this.amount--;
        } else {
          this.$store.commit('deleteCartProduct', value);
        }
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
