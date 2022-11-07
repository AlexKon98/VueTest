<template>
   <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a @click.prevent="pageDown()"
        class="pagination__link pagination__link--arrow pagination__link--disabled"
        aria-label="Предыдущая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a href="#" @click.prevent="paginate(pageNumber)" class="pagination__link"
        :class="{'pagination__link--current': pageNumber === page}">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a @click.prevent="pageUp()"
        class="pagination__link pagination__link--arrow" href="#"
        aria-label="Следующая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    pageUp() {
      if (this.page < this.pages) {
        this.page + 1;
      }
    },
    pageDown() {
      if (this.page > 1) {
        this.page - 1;
      }
    },
  },
};
</script>
