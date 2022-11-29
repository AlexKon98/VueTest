<template>

  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decr">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="countInput" name="count" id="input-counter">

    <button type="button" aria-label="Добавить один товар" @click="incr">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

</template>

<script>
export default {
  props: ['count'],
  methods: {
    incr() {
      this.$emit('update:count', this.count + 1);
    },
    decr() {
      if (this.count > 1) {
        this.$emit('update:count', this.count - 1);
      }
    },
  },
  computed: {
    countInput: {
      get() {
        return this.count;
      },
      set(value) {
        this.$emit('update:count', value);
      },
    },
  },
  watch: {
    count(value) {
      this.countInput = value;
    },
  }
}
</script>
