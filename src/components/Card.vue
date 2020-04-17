<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    :data-test="`card-${value}${suit}`">
    <SvgIcon
      v-if="visible"
      :name="`${this.value}${this.suit.toUpperCase()}`" />

    <SvgIcon
      v-if="!visible"
      name="Card_back_17" />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Card',
  components: {
    SvgIcon,
  },
  props: {
    id: {
      type: [String, Number],
      default: 0,
    },
    value: {
      type: String,
      default: 'A',
    },
    suit: {
      type: String,
      default: 'c',
    },
    order: {
      type: Number,
      default: 0,
    },
    position: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    revealed: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      const { selectedCardId } = this.$store.getters;

      return {
        'card--is-visible': this.visible,
        'card--is-s': this.suit === 's',
        'card--is-d': this.suit === 'd',
        'card--is-h': this.suit === 'h',
        'card--is-c': this.suit === 'c',
        'card--is-selected': selectedCardId === this.id,
        'card--is-not-clickable': !this.clickable,
      };
    },
  },
  methods: {
    selectCard(e, id) {
      const { selectedCardId } = this.$store.getters;

      if (!selectedCardId) {
        e.stopPropagation();

        if (this.clickable && this.visible) {
          this.$store.dispatch('selectCard', id);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  transition: all .05s ease-in-out;
  transform-style: preserve-3d;

  &:nth-of-type(n+2) {
    margin-top: -#{$card-height * $card-spacer};

    @media (min-width: $bp-sm) {
      margin-top: -#{$card-height-sm * $card-spacer};
    }

    @media (min-width: $bp-md) {
      margin-top: -#{$card-height-md * $card-spacer};
    }

    @media (min-width: $bp-lg) {
      margin-top: -#{$card-height-lg * $card-spacer};
    }

    @media (min-width: $bp-xl) {
      margin-top: -#{$card-height-xl * $card-spacer};
    }
  }

  &--is-s {
    &--color-blind {
      color: black;
    }
  }

  &--is-d {
    &--color-blind {
      color: blue;
    }
  }

  &--is-h {
    &--color-blind {
      color: red;
    }
  }

  &--is-c {
    &--color-blind {
      color: orange;
    }
  }

  &--is-selected {
    transform: scale(1.1);
  }

  &--is-not-clickable {
    pointer-events:none;
  }
}
</style>
