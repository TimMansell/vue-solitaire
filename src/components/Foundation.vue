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
  margin-bottom: $mg-sm;

  @media (min-width: $bp-sm) {
    margin-bottom: $mg-md;
  }

  &__column {
    padding-left: $col-padding;
    padding-right: $col-padding;

    @media (min-width: $bp-md) {
      padding-left: $col-padding-lg;
      padding-right: $col-padding-lg;
    }
  }
}
</style>
