<template>

  <ul class="colors" :class="{'colors--black': black}">

    <li class="colors__item">
      <label class="colors__label" :for="product.id+'_'+'blue'">
        <input class="colors__radio sr-only" :id="product.id+'_'+'blue'" type="radio" :value="product.colors[0]" v-model="color" :name="'color'+product.id" checked="">
        <span class="colors__value" :style="{'background-color': product.colors[0]}" :class="{'active': product.colors[0] === '#FFF'}">
        </span>
      </label>
    </li>

    <li class="colors__item">
      <label class="colors__label"
      :for="product.id+'_'+'green'">
        <input class="colors__radio sr-only" :id="product.id+'_'+'green'" type="radio" :value="product.colors[1]" v-model="color" :name="'color'+product.id">
        <span class="colors__value" :style="{'background-color': product.colors[1]}" :class="{'active': product.colors[1] === '#FFF'}">
        </span>
      </label>
    </li>

    <li class="colors__item">
      <label class="colors__label" :for="product.id+'_'+'black'">
        <input class="colors__radio sr-only" :id="product.id+'_'+'black'" type="radio" :value="product.colors[2]" v-model="color" :name="'color'+product.id">
        <span class="colors__value" :style="{'background-color': product.colors[2]}" :class="{'active': product.colors[2] === '#FFF'}">
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
