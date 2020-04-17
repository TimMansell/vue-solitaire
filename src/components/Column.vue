<template>
  <div
    class="column"
    @click="moveCardToColumn(columnNo)"
    :data-test="`column-${columnNo}`">
    <div
      @drop="dropCard($event, columnNo)"
      @dragover.prevent
      @dragenter.prevent>
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :id="card.id"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :revealed="card.revealed"
        :visible="card.visible" />
    </div>
    <div
      @drop="dropKing($event, columnNo)"
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
    moveCardToColumn(columnNo) {
      const { selectedCardId } = this.$store.getters;

      if (selectedCardId) {
        this.$store.dispatch('setColumn', columnNo);
        this.$store.dispatch('moveCardsToColumn');
      }
    },
    dropKing(e) {
      const idDrag = parseInt(e.dataTransfer.getData('id'), 10);
      const { columnNo } = this;

      console.log('drag king card', idDrag);
      console.log('drag king to column', columnNo);

      const dispatch = {
        idDrag,
        columnNo,
      };

      console.log('d', dispatch);

      this.$store.dispatch('moveKingById', dispatch);

      // this.moveKingToColumn();
    },
    dropCard(e, columnNo) {
      const idDrag = parseInt(e.dataTransfer.getData('id'), 10);

      // console.log('drag card', idDrag);
      // console.log('drag to column', columnNo);

      const dispatch = {
        idDrag,
        columnNo,
      };

      console.log('d', dispatch);

      this.$store.dispatch('moveCardById', dispatch);
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
