<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ColorsList :product="product" :black="true"/>

  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import gotoPage from '@/helpers/gotoPage';
import ColorsList from './ColorsList.vue';

export default {
  components: { ColorsList },
  props: ['product'],
  methods: {
    gotoPage,
  },
  filters: {
    numberFormat,
  },
};
</script>
