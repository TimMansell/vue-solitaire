<template>
  <div
    class="column"
    @click="moveKingToColumn"
    :data-test="`column-${columnNo}`">
    <Card
      v-for="(card, index) in cards"
      :key="index"
      :value="card.value"
      :suit="card.suit"
      :order="card.order"
      :position="card.position"
      :visible="card.visible" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Column',
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    columnNo: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    moveKingToColumn() {
      const { columnNo } = this;

      this.$store.dispatch('moveKingToColumn', columnNo);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.column {
  flex: 1;
  padding: .1rem;

  @media (min-width: 900px) {
    padding: .5rem;
  }
}
</style>
