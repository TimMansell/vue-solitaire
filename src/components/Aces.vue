<template>
  <div
    class="aces"
    @click="moveCardToFoundation"
    data-test="ace">
    <div
      class="ace"
      v-for="(ace, foundationIndex) in foundationCards"
      :key="`f-${foundationIndex}`"
      :data-test="`ace-${foundationIndex}`">
      <Card
        v-for="(card, aceIndex) in ace"
        :key="`a-${aceIndex}`"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :visible="card.visible"
        :clickable="false" />
    </div>
    <div
      class="ace"
      v-for="(ace, placeholderIndex) in placeholderCards"
      :key="`p-${placeholderIndex}`"
      data-test="ace-placeholder">
      <SvgIcon
        class="ace__placeholder"
        v-if="!ace.length"
        name="Card_back_17" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Aces',
  components: {
    Card,
    SvgIcon,
  },
  data() {
    return {
      aces: this.$store.getters.aces,
      placeholderCardsAmount: 4,
    };
  },
  computed: {
    foundationCards() {
      const { aces } = this;

      const clubs = aces.filter((ace) => ace.suit === 'c');
      const spades = aces.filter((ace) => ace.suit === 's');
      const diamonds = aces.filter((ace) => ace.suit === 'd');
      const hearts = aces.filter((ace) => ace.suit === 'h');

      const foundationCards = [
        clubs,
        spades,
        diamonds,
        hearts,
      ];

      return foundationCards.filter((ace) => ace.length);
    },
    placeholderCards() {
      const { foundationCards, placeholderCardsAmount } = this;
      const usedPlaceholders = foundationCards.filter((cards) => cards.length);

      return placeholderCardsAmount - usedPlaceholders.length;
    },
  },
  methods: {
    moveCardToFoundation() {
      this.$store.dispatch('moveCardToFoundation');
    },
  },
};
</script>

<style scoped lang="scss">
.aces {
  display: flex;

   @media (min-width: $bp-sm) {
    margin-bottom: .5rem;
  }
}

.ace {
  padding: $col-padding;

  @media (min-width: $bp-md) {
    padding: $col-padding-lg;
  }

  &__placeholder {
    opacity: .1;
  }
}

.card {
  &:nth-of-type(n+2) {
    margin-top: -#{$card-height + 4}; // Todo: fix magic number

    @media (min-width: $bp-lg) {
      margin-top: -#{$card-height-lg + 4}; // Todo: fix magic number
    }
  }
}
</style>
