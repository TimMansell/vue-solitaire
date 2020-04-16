<template>
  <div
    class="column"
    @click="moveKingToColumn"
    :data-test="`column-${columnNo}`">
    <div
      @drop="dropCard($event)"
      @dragover.prevent
      @dragenter.prevent>
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :revealed="card.revealed"
        :visible="card.visible" />
    </div>
    <div
      @drop="dropKing($event)"
      @dragover.prevent
      @dragenter.prevent>
      <SvgIcon
        class="card-placeholder"
        data-test="card-placeholder"
        v-if="!cards.length"
        name="Card_back_15" />
    </div>
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
    dropKing(e) {
      const {
        value,
        order,
        suit,
        position,
        visible,
      } = this;

      const card = {
        value,
        order,
        suit,
        position,
        visible,
      };

      const valueDrag = e.dataTransfer.getData('value');
      const orderDrag = e.dataTransfer.getData('order');
      const suitDrag = e.dataTransfer.getData('suit');
      const positionDrag0 = e.dataTransfer.getData('position0');
      const positionDrag1 = e.dataTransfer.getData('position1');
      const visibleDrag = e.dataTransfer.getData('visible');

      const cardDrag = {
        value: valueDrag,
        order: parseInt(orderDrag, 10),
        suit: suitDrag,
        position: [positionDrag0, positionDrag1],
        visible: !!visibleDrag,
      };

      console.log('drag king card', cardDrag);
      console.log('drag king to card', card);

      this.$store.dispatch('moveCard', cardDrag);
      // this.$store.dispatch('moveCard', card);

      this.moveKingToColumn();
    },
    dropCard(e) {
      const {
        value,
        order,
        suit,
        position,
        visible,
      } = this;

      const card = {
        value,
        order,
        suit,
        position,
        visible,
      };

      const valueDrag = e.dataTransfer.getData('value');
      const orderDrag = e.dataTransfer.getData('order');
      const suitDrag = e.dataTransfer.getData('suit');
      const positionDrag0 = e.dataTransfer.getData('position0');
      const positionDrag1 = e.dataTransfer.getData('position1');
      const visibleDrag = e.dataTransfer.getData('visible');

      const cardDrag = {
        value: valueDrag,
        order: parseInt(orderDrag, 10),
        suit: suitDrag,
        position: [positionDrag0, positionDrag1],
        visible: !!visibleDrag,
      };

      console.log('drag card', cardDrag);
      console.log('drag to card', card);

      this.$store.dispatch('moveCard', cardDrag);
      this.$store.dispatch('moveCard', card);

      // this.moveKingToColumn();
    },
  },
};
</script>

<style scoped lang="scss">
.column {
  padding-left: $col-padding;
  padding-right: $col-padding;

  @media (min-width: $bp-md) {
    padding-left: $col-padding-lg;
    padding-right: $col-padding-lg;
  }
}

.card-placeholder {
  opacity: .1;
}
</style>
