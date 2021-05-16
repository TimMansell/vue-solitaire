<template>
  <ul class="pagination">
    <li v-for="index in pages" :key="index">
      <Button @click="displayPage(index)">
        {{ index }}
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
  methods: {
    displayPage(page) {
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
