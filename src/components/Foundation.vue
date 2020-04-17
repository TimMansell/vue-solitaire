<template>
  <div
    class="foundation"
    data-test="ace">
    <div
      class="foundation__column"
      v-for="(foundation, foundationsIndex) in foundationCards"
      :key="`f-${foundationsIndex}`"
      @click="moveCardToFoundation(foundationsIndex)"
      :data-test="`foundation-${foundationsIndex}`">
      <Card
        v-for="(card, foundationIndex) in foundation"
        :key="`a-${foundationIndex}`"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :visible="card.visible"
        :clickable="false" />

      <SvgIcon
        class="foundation__placeholder"
        v-if="!foundation.length"
        name="Card_back_17" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Foundation',
  components: {
    Card,
    SvgIcon,
  },
  data() {
    return {
      foundationCards: this.$store.getters.foundationCards,
    };
  },
  methods: {
    moveCardToFoundation(columnIndex) {
      this.$store.dispatch('setFoundationColumn', columnIndex);
      this.$store.dispatch('moveCardToFoundation');
    },
  },
};
</script>

<style scoped lang="scss">
.foundation {
  display: flex;

   @media (min-width: $bp-sm) {
    margin-bottom: .5rem;
  }

  &__column {
    padding-left: $col-padding;
    padding-right: $col-padding;

    @media (min-width: $bp-md) {
      padding-left: $col-padding-lg;
      padding-right: $col-padding-lg;
    }
  }

  &__placeholder {
    opacity: .1;
  }
}

.card {
  &:nth-of-type(n+2) {
    margin-top: -#{$card-height};

    @media (min-width: $bp-sm) {
      margin-top: -#{$card-height-sm};
    }

    @media (min-width: $bp-md) {
      margin-top: -#{$card-height-md + 4};
    }

    @media (min-width: $bp-lg) {
      margin-top: -#{$card-height-lg};
    }

    @media (min-width: $bp-xl) {
      margin-top: -#{$card-height-xl};
    }
  }
}
</style>
