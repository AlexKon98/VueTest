<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        <span>{{ products.length }} </span>
        <span >товаров</span>
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="loader__flex-spec" v-if="products.length <= 0">
            <span>Идёт загрузка товаров</span>
            <img src="https://shop.marideco.ru/bitrix/templates/newshop/img/lazyimg-loader.gif" alt="" />
          </div>
          <ul class="cart__list" v-if="products.length > 0">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import FormCounter from '@/components/FormCounter.vue';
import CartItem from '@/components/CartItem.vue';

export default {
  components: { CartItem, FormCounter },
  computed: {
    ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}),
  },
  filters: {
    numberFormat,
  }
}
</script>
