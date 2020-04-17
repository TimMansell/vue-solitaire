<template>
  <div
    class="card"
    :class="classes"
    @click.stop="moveCard"
    :data-test="`card-${value}${suit}`"
    @dragstart="dragCard"
    draggable>
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
      const { toMove } = this.$store.getters;

      return {
        'card--is-visible': this.visible,
        'card--is-s': this.suit === 's',
        'card--is-d': this.suit === 'd',
        'card--is-h': this.suit === 'h',
        'card--is-c': this.suit === 'c',
        'card--is-selected': toMove && `${toMove.value}${toMove.suit}` === `${this.value}${this.suit}`,
        'card--is-not-clickable': !this.clickable,
      };
    },
  },
  methods: {
    moveCard() {
      const {
        value,
        order,
        suit,
        position,
        visible,
      } = this;

      const card = {
        value,
        order,
        suit,
        position,
        visible,
      };

      if (this.clickable && this.visible) {
        this.$store.dispatch('moveCard', card);
      }
    },
    dragCard(e) {
      const {
        id,
      } = this;

      console.log('iiid', id);

      // e.dataTransfer.effectAllowed = 'move';
      // e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('id', id);
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
