<template>
  <div
    class="card"
    :class="classes"
    @click.stop="moveCard"
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  transition: transform .1s ease-in-out;
  transform-style: preserve-3d;

  &:nth-of-type(n+2) {
    margin-top: -#{$card-height * .75};

    @media (min-width: $bp-desktop) {
      margin-top: -#{$card-height-lg * .75};
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
    transform: translateY(-1rem);
    animation-duration: 3s;
  }

  &--is-not-clickable {
    pointer-events:none;
  }
}
</style>
