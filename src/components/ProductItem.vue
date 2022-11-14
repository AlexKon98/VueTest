<template>

  <div>
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price + '₽' }}
    </span>

    <ColorsList :product="product" />

  </div>

</template>

<script>
import ColorsList from './ColorsList.vue';

export default {
  components: { ColorsList },
  props: ['product'],
};
</script>
