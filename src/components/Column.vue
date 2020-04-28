<template>
  <div
    class="column"
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
      :order="card.order"
      :revealed="card.revealed"
      :visible="card.visible"
    />

    <SvgIcon
      class="card-placeholder"
      data-test="card-placeholder"
      v-if="!cards.length"
      name="Card_back_15"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  opacity: 0.1;
}
</style>
