<template>

   <ul class="catalog__pagination pagination">

      <li class="pagination__item">
        <a @click.prevent="pageDown(page)" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': page === 1}" aria-label="Предыдущая страница" href="#">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>

      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a @click.prevent="paginate(pageNumber)" class="pagination__link" href="#" :class="{'pagination__link--current': pageNumber === page}">
          {{ pageNumber }}
        </a>
      </li>

      <li class="pagination__item">
        <a @click.prevent="pageUp(page)" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': page === pages}" aria-label="Следующая страница" href="#">
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
    pageUp(page) {
      if (page < Math.ceil(this.count / this.perPage)) {
        this.$emit('paginate', page + 1);
      }
    },
    pageDown(page) {
      if (page > 1) {
        this.$emit('paginate', page - 1);
      }
    },
  },
};
</script>
