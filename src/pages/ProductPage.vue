<template>

<main class="content container" v-if="productLoading">Загрузка товара...</main>

<main class="content container" v-else-if="productLoadingFailed">Не удалось загрузить товар...</main>

<main class="content container" v-else="productsData">
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{name: 'main'}">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{name: 'main', params: { id: product.category.id}}">
          {{ product.category.title }}
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          {{ product.title }}
        </a>
      </li>
    </ul>
  </div>

  <section class="item">
    <div class="item__pics pics">
      <div class="pics__wrapper">
        <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
      </div>
      <ul class="pics__list">
        <li class="pics__item">
          <a href="" class="pics__link pics__link--current">
            <img width="98" height="98" :src="product.image.file.url" :alt="product.title">
          </a>
        </li>
      </ul>
    </div>

    <div class="item__info">
      <span class="item__code">Артикул: {{ product.id }}</span>
      <h2 class="item__title">
        {{ product.title }}
      </h2>
      <div class="item__form">
        <form class="form" action="#" method="POST" @submit.prevent="addToCart">
          <b class="item__price">
            {{ product.price | numberFormat }} ₽
          </b>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет:</legend>
            <ColorsList :product="product" :black="false"/>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ:</legend>

            <ul class="sizes sizes--primery">
              <li class="sizes__item">
                <label class="sizes__label">
                  <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                  <span class="sizes__value">
                    32gb
                  </span>
                </label>
              </li>
              <li class="sizes__item">
                <label class="sizes__label">
                  <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                  <span class="sizes__value">
                    64gb
                  </span>
                </label>
              </li>
              <li class="sizes__item">
                <label class="sizes__label">
                  <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked>
                  <span class="sizes__value">
                    128gb
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <div class="item__row">

            <FormCounter :count.sync="productAmount"/>

            <button class="button button--primery" type="submit" :disabled="productAddSending">
              В корзину
            </button>
          </div>
          <div class="added-to-cart" v-show="productAdded">
            Товар добавлен в корзину
          </div>
          <div class="loading-to-cart" v-show="productAddSending">
            <img src="https://shop.marideco.ru/bitrix/templates/newshop/img/lazyimg-loader.gif" alt="">
          </div>

        </form>
      </div>
    </div>

    <div class="item__desc">
      <ul class="tabs">
        <li class="tabs__item">
          <a class="tabs__link tabs__link--current">
            Описание
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Характеристики
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Гарантия
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Оплата и доставка
          </a>
        </li>
      </ul>

      <div class="item__content">
        <p>
          Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
          Синхронизация со смартфоном<br>
          Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
          Поддержка сторонних приложений<br>
        </p>

        <a href="#">
          Все характеристики
        </a>

        <h3>Что это?</h3>

        <p>Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.</p>

        <h3>Дизайн</h3>

        <p>Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.</p>
      </div>
    </div>
  </section>
</main>

</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import ColorsList from '@/components/ColorsList.vue';
import FormCounter from '@/components/FormCounter.vue';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      productAmount: 1,
      productsData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productsData;
    },
    category() {
      return this.productsData.category.id;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({productId: this.product.id, amount: this.productAmount})
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(API_BASE_URL + '/api/products/' + this.$route.params.id)
        .then(res => this.productsData = res.data)
        .catch(() => this.productLoadingFailed = true)
        .then(() => this.productLoading = false);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
  components: { ColorsList, FormCounter },
};
</script>

<style>
.pics__wrapper img {
  max-height: 700px;
  object-fit: contain;
}
.loading-to-cart {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.added-to-cart {
  margin-top: 10px;
}
</style>
