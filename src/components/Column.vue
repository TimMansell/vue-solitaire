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
      :revealed="card.revealed"
      :visible="card.visible" />

    <SvgIcon
      class="card-placeholder"
      data-test="card-placeholder"
      v-if="!cards.length"
      name="Card_back_15" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Column',
  components: {
    Card,
    SvgIcon,
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
  padding-left: $padding;
  padding-right: $padding;

  @media (min-width: $bp-desktop) {
    padding-left: $padding-lg;
    padding-right: $padding-lg;
  }
}

.card-placeholder {
  opacity: .1;
}
</style>
