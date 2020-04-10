<template>
  <div class="column">
    <Card
      v-for="(card, index) in cards"
      :key="index"
      :value="card.value"
      :suit="card.suit"
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.column {
  flex: 1;
  border: 1px solid white;
  padding: .5rem;
}
</style>
