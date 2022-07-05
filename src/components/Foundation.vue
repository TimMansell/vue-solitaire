<template>
  <div class="foundation" data-test="foundations">
    <div
      v-for="(foundation, foundationsIndex) in foundation"
      :key="`f-${foundationsIndex}`"
      @click="moveCardToFoundation(foundationsIndex)"
      @drop="moveCardToFoundation(foundationsIndex)"
      @dragover.prevent
      @dragenter.prevent
      :data-test="`foundation-${foundationsIndex}`"
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
    ...mapGetters(['foundation']),
  },
  methods: {
    ...mapActions(['moveCardToFoundation']),
  },
};
</script>

<style scoped lang="scss">
.foundation {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-flow: column;
  margin-bottom: var(--mg-sm);
  gap: var(--pd-xs);

  @media (min-width: $bp-md) {
    gap: var(--pd-sm);
    margin-bottom: var(--mg-md);
  }
}
</style>
