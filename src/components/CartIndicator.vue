<template>
  <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <div v-if="$store.state.cartProducts.length <= 0" class="cart-loading">
      <img src="https://shop.marideco.ru/bitrix/templates/newshop/img/lazyimg-loader.gif" alt="" />
    </div>
    <span v-if="$store.state.cartProducts.length > 0" class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
export default {};
</script>

<style>
.cart-loading {
  width: 20px;
  height: 20px;
  position: absolute;
  right: -15px;
  top: -15px;
  background-color: #9eff00;
}

.cart-loading img {
  width: 100%;
}
</style>
