<template>
  <div
    @click="setColumn(columnNo)"
    @drop="dropCard(columnNo)"
    @dragover.prevent
    @dragenter.prevent
    :data-test="`column-${columnNo}`"
  >
    <Card
      v-for="(card, index) in cards"
      :key="index"
      :id="card.id"
      :value="card.value"
      :suit="card.suit"
      :revealed="card.revealed"
      :visible="card.visible"
      :bottom-card="cards.length - 1 === index"
    />

    <CardPlaceholder
      v-if="!cards.length"
      see-through
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
    ...mapGetters(['selectedCardId']),
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
