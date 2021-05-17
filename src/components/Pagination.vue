<template>
  <ul class="pagination">
    <li>
      <Button @click="displayPage(firstPage)">
        First
      </Button>
    </li>
    <li>
      <Button @click="displayPage(previousPage)">
        Previous
      </Button>
    </li>
    <li v-for="index in pages" :key="index">
      <Button @click="displayPage(index)">
        {{ index }}
      </Button>
    </li>
    <li>
      <Button @click="displayPage(nextPage)">
        Next
      </Button>
    </li>
    <li>
      <Button @click="displayPage(lastPage)">
        Last
      </Button>
    </li>
  </ul>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Pagination',
  components: {
    Button,
  },
  props: {
    pages: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    firstPage() {
      return 1;
    },
    previousPage() {
      const page = this.page - 1;

      return page;
    },
    nextPage() {
      const page = this.page + 1;

      return page;
    },
    lastPage() {
      return this.pages;
    },
  },
  methods: {
    displayPage(page) {
      this.page = page;
      this.$emit('page', page);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--pd-xs);
  list-style-type: none;
  padding: 0;
}
</style>
