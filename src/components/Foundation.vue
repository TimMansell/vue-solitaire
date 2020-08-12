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
  display: flex;
  margin-bottom: var(--mg-sm);
  margin-left: calc(var(--col-padding) * -1);
  margin-right: calc(var(--col-padding) * -1);

  @media (min-width: $bp-md) {
    margin-bottom: var(--mg-md);
    margin-left: calc(var(--col-padding-lg) * -1);
    margin-right: calc(var(--col-padding-lg) * -1);
  }

  &__column {
    padding-left: var(--col-padding);
    padding-right: var(--col-padding);

    @media (min-width: $bp-md) {
      padding-left: var(--col-padding-lg);
      padding-right: var(--col-padding-lg);
    }
  }
}
</style>
