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
        :order="card.order"
        :position="card.position"
        :visible="card.visible"
        :clickable="false"
      />

      <SvgIcon class="foundation__placeholder" v-if="!foundation.length" name="Card_back_17" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '@/components/Card.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Foundation',
  components: {
    Card,
    SvgIcon,
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

  @media (min-width: $bp-sm) {
    margin-bottom: 0.5rem;
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
    opacity: 0.1;
  }
}

.card {
  &:nth-of-type(n + 2) {
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
