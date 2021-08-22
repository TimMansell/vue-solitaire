<template>
  <div>
    <div class="columns" data-test="columns">
      <Column
        v-for="(column, index) in formattedCards"
        :key="index"
        :column-no="index"
        :cards="column"
        ref="column"
      />
    </div>
    <DraggedCards :width="cardWidth" />
  </div>
</template>

<script>
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';
import { debounce } from 'throttle-debounce';
import { mapGetters } from 'vuex';
import Column from '@/components/Column.vue';
import DraggedCards from '@/components/DraggedCards.vue';

export default {
  name: 'Columns',
  components: {
    Column,
    DraggedCards,
  },
  data() {
    return {
      cardWidth: 150,
    };
  },
  computed: {
    ...mapGetters(['cards', 'draggedCardsIDs']),
    formattedCards() {
      const { cards, draggedCardsIDs } = this;

      const cardsWithDragged = cards.map((columnCards) =>
        columnCards.map(({ id }) => {
          const isDragged = draggedCardsIDs.includes(id);

          return { ...cards, isDragged };
        })
      );

      return cardsWithDragged;
    },
  },
  mounted() {
    const events = {
      resize: debounce(300, false, this.getColumnWidth),
    };

    this.events = addEventListener(events);

    this.getColumnWidth();
  },
  destroyed() {
    const { events } = this;

    removeEventListener(events);
  },
  methods: {
    getColumnWidth() {
      const { column } = this.$refs;
      const { clientWidth } = column[0].$el;

      this.cardWidth = clientWidth;
    },
  },
};
</script>

<style scoped lang="scss">
.columns {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-flow: column;
  gap: var(--pd-xs);

  @media (min-width: $bp-md) {
    gap: var(--pd-sm);
  }
}
</style>
