<!-- eslint-disable -->
<template>

  <aside class="filter">

    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">

      <fieldset class="form__block">

        <legend class="form__legend">Цена</legend>

        <label class="form__label form__label--price" for="price-first">
          <input class="form__input" id="price-first" type="number" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="price-last">
          <input class="form__input" id="price-last" type="number" name="max-price" placeholder="12345" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>

      </fieldset>

      <fieldset class="form__block">

        <legend class="form__legend">Категория</legend>

        <label class="form__label form__label--select" for="category">
          <select class="form__select" type="text" name="category" id="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>

      </fieldset>

      <fieldset class="form__block">

        <legend class="form__legend">Цвет</legend>

        <ul class="colors">

          <li class="colors__item">
            <label class="colors__label" for="color1">
              <input class="colors__radio sr-only" id="color1" type="radio" name="color" v-model="currentColor" value="#73B6EA">
              <span class="colors__value" style="background-color: #73B6EA;">
              </span>
            </label>
          </li>

          <li class="colors__item">
            <label class="colors__label" for="color2">
              <input class="colors__radio sr-only" id="color2" type="radio" name="color" v-model="currentColor" value="#FFBE15">
              <span class="colors__value" style="background-color: #FFBE15;">
              </span>
            </label>
          </li>

          <li class="colors__item">
            <label class="colors__label" for="color3">
              <input class="colors__radio sr-only" id="color3" type="radio" name="color" v-model="currentColor" value="#939393">
              <span class="colors__value" style="background-color: #939393;">
            </span></label>
          </li>

          <li class="colors__item">
            <label class="colors__label" for="color4">
              <input class="colors__radio sr-only" id="color4" type="radio" name="color" v-model="currentColor" value="#8BE000">
              <span class="colors__value" style="background-color: #8BE000;">
            </span></label>
          </li>

          <li class="colors__item">
            <label class="colors__label" for="color5">
              <input class="colors__radio sr-only" id="color5" type="radio" name="color" v-model="currentColor" value="#FF6B00">
              <span class="colors__value" style="background-color: #FF6B00;">
            </span></label>
          </li>

          <li class="colors__item">
            <label class="colors__label" for="color6">
              <input class="colors__radio sr-only" id="color6" type="radio" name="color" v-model="currentColor" value="#FFF">
              <span class="colors__value" style="background-color: #FFF;">
            </span></label>
          </li>

          <li class="colors__item">
            <label class="colors__label" for="color7">
              <input class="colors__radio sr-only" id="color7" type="radio" name="color" v-model="currentColor" value="#000">
              <span class="colors__value" style="background-color: #000;">
            </span></label>
          </li>

        </ul>

      </fieldset>

      <fieldset class="form__block">

        <legend class="form__legend">Объемб в ГБ</legend>

        <ul class="check-list">

          <li class="check-list__item">
            <label class="check-list__label" for="ram8">
              <input class="check-list__check sr-only" id="ram8" type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>

          <li class="check-list__item">
            <label class="check-list__label" for="ram16">
              <input class="check-list__check sr-only" id="ram16" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>

          <li class="check-list__item">
            <label class="check-list__label" for="ram32">
              <input class="check-list__check sr-only" id="ram32" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>

          <li class="check-list__item">
            <label class="check-list__label" for="ram64">
              <input class="check-list__check sr-only" id="ram64" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>

          <li class="check-list__item">
            <label class="check-list__label" for="ram128">
              <input class="check-list__check sr-only" id="ram128" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>

          <li class="check-list__item">
            <label class="check-list__label" for="ram264">
              <input class="check-list__check sr-only" id="ram264" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>

        </ul>

      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>

      <button @click="clear" class="filter__reset button button--second" type="button">
        Сбросить
      </button>

    </form>

  </aside>

</template>

<script>
import categories from '../data/categories';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: '',
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'filterColor', 'page'],
  computed: {
    categories() {
      return categories;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:filterColor', this.currentColor);
    },
    clear() {
      this.$emit('update:page', 1);
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:filterColor', '');
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    filterColor(value) {
      this.currentColor = value;
    },
  },
};
</script>
