<template>
  <div
    @click="setColumn(columnNo)"
    @drop="dropCard(columnNo)"
    @dragover.prevent
    @dragenter.prevent
    :data-test="`column-${columnNo}`"
  >
    <Card
      v-for="({ id, value, suit, visible, isDragged }, index) in cards"
      :key="index"
      :id="id"
      :value="value"
      :suit="suit"
      :visible="visible"
      :is-dragged="isDragged"
      :bottom-card="cards.length - 1 === index"
    />

    <CardPlaceholder
      v-if="!cards.length"
      :cards="placeholderCards"
      :see-through="!isEmptyBoard"
      data-test="column-card-placeholder"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '@/components/Card.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

export default {
  name: 'Column',
  components: {
    Card,
    CardPlaceholder,
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
  computed: {
    ...mapGetters(['selectedCardId', 'isEmptyBoard', 'placeholders']),
    placeholderCards() {
      const { columnNo, isEmptyBoard, placeholders } = this;
      const DEFAULT_CARDS = 1;

      const numberOfCards = isEmptyBoard
        ? placeholders[columnNo]
        : DEFAULT_CARDS;

      return numberOfCards;
    },
  },
  methods: {
    ...mapActions(['moveCardsToColumn']),
    setColumn(columnNo) {
      const { selectedCardId } = this;

      if (selectedCardId) {
        this.moveCardsToColumn(columnNo);
      }
    },
    dropCard(columnNo) {
      this.moveCardsToColumn(columnNo);
    },
  },
};
</script>
