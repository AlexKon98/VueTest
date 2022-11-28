<template>

  <ul class="colors" :class="{'colors--black': black}">

    <li class="colors__item" v-for="(color, index) in product.colors" :key="color.id">
      <label class="colors__label" :for="product.id+'_'+color.title">
        <input class="colors__radio sr-only" :id="product.id+'_'+color.title" type="radio" :value="color.code" @input="color = color.code" :name="'color'+product.id" :checked="index === 0">
        <span class="colors__value" :style="{'background-color': color.code}" :class="{'active': color.code === '#FFF'}">
        </span>
      </label>
    </li>

  </ul>

</template>

<script>
export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['product', 'black'],
};
</script>

<style>
  .colors__value.active {
    border: 1px solid rgba(0, 0, 0, .25);
  }
</style>
