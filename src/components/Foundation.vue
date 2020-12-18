<template>
  <div class="foundation">
    <div
      class="foundation__column"
      v-for="(foundation, foundationsIndex) in foundationCards"
      :key="`f-${foundationsIndex}`"
      @click="setFoundationColumn(foundationsIndex)"
      :data-test="`foundation-${foundationsIndex}`"
      @drop="dropCard(foundationsIndex)"
      @dragover.prevent
      @dragenter.prevent
    >
      <Card
        v-for="(card, foundationIndex) in foundation"
        :key="`a-${foundationIndex}`"
        :id="card.id"
        :value="card.value"
        :suit="card.suit"
        :visible="card.visible"
        :clickable="false"
        stacked
      />

      <CardPlaceholder v-if="!foundation.length" see-through />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '@/components/Card.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

export default {
  name: 'Foundation',
  components: {
    Card,
    CardPlaceholder,
  },
  computed: {
    ...mapGetters(['foundationCards']),
  },
  methods: {
    ...mapActions(['moveCardToFoundation']),
    setFoundationColumn(columnIndex) {
      this.moveCardToFoundation(columnIndex);
    },
    dropCard(columnIndex) {
      this.moveCardToFoundation(columnIndex);
    },
  },
};
</script>

<style scoped lang="scss">
.foundation {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 4fr;
  grid-auto-flow: column;
  margin-bottom: var(--mg-sm);
  padding-left: var(--pd-xs);
  padding-right: var(--pd-xs);

  @media (min-width: $bp-md) {
    margin-bottom: var(--mg-md);
  }

  @media (min-width: $bp-lg) {
    padding-left: 0;
    padding-right: 0;
  }

  &__column {
    padding-left: var(--pd-xs);
    padding-right: var(--pd-xs);

    @media (min-width: $bp-lg) {
      padding-left: var(--pd-sm);
      padding-right: var(--pd-sm);
    }
  }
}
</style>
