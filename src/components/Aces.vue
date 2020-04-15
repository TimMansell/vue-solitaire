<template>
  <div
    class="aces"
    @click="moveCardToFoundation"
    data-test="ace">
    <div
      class="ace"
      v-for="(ace, index) in aces"
      :key="index"
      :data-test="`ace-${index}`">
      <Card
        v-for="(card, index2) in ace"
        :key="index2"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :visible="card.visible"
        :clickable="false" />

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
      placeholders: [
        'h',
        's',
        'c',
        'd',
      ],
    };
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
